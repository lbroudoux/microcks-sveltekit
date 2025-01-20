<script lang="ts">
  
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { toast } from "svelte-sonner";

  import { ChevronRight } from 'lucide-svelte';

  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import { MediumDate, TimeAgo } from "$lib/components/ui/time";

  import { Badge } from "$lib/components/ui/badge";
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Collapsible from "$lib/components/ui/collapsible";
  import { LabelsDialog, LabelsList } from '$lib/components/ui/labels';

  import ApiTag from '$lib/components/ui/api-tag/api-tag.svelte';

  import { ServiceType, type Operation, type ServiceView } from "$lib/models/service.model";
  import { updateServiceMetadata } from '$lib/services/services.service';
  import { ConfigService } from '$lib/services/config.service';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let view: ServiceView = $state(data.serviceView);
  let config: ConfigService = ConfigService.instance;

  onMount(() => {
    console.log("In page /services/[id] onMount()");
  })

  let labelsDialogIsOpen: boolean = $state(false);

  function updateLabels(labels: Record<string, string>): void {
    console.log("updateLabels() called with:", labels);
    view.service.metadata.labels = labels;
    updateServiceMetadata(view.service, view.service.metadata)
        .then((updatedService) => {
          view.service = updatedService;
          toast.success("Labels have been updated");
        })
        .catch((error) => {
          toast.error("Labels cannot be updated (" + error.message + ")");
        }); 
  }

  function isEventTypeService(): boolean {
    return view.service.type === ServiceType.EVENT 
        || view.service.type === ServiceType.GENERIC_EVENT;
  }
  function isAsyncMockEnabled(operation: Operation): boolean {
    return hasAsyncAPIFeatureEnabled() && operation.defaultDelay != 0;
  }
  function getBindingsList(operation: Operation): string {
    if (operation.bindings != null) {
      let result = '';
      const bindings = Object.keys(operation.bindings);
      for (let i = 0; i < bindings.length; i++) {
        const b = bindings[i];
        switch (b) {
          case 'KAFKA':
            result += 'Kafka';
            break;
          case 'NATS':
            result += 'NATS';
            break;
          case 'MQTT':
            result += 'MQTT';
            break;
          case 'WS':
            result += 'WebSocket';
            break;
          case 'AMQP':
            result += 'AMQP';
            break;
          case 'AMQP1':
            result += 'AMQP 1.0';
            break;
          case 'GOOGLEPUBSUB':
            result += 'Google PubSub';
            break;
          case 'SNS':
            result += 'Amazon SNS';
            break;
          case 'SQS':
            result += 'Amazon SQS';
            break;
        }
        if (i + 1 < bindings.length) {
          result += ', ';
        }
      }
      return result;
    }
    return null;
  }

  function hasAICopilotEnabled(): boolean {
    return config.hasFeatureEnabled('ai-copilot');
  }
  function hasAsyncAPIFeatureEnabled(): boolean {
    return config.hasFeatureEnabled('async-api');
  }
  function hasRepositoryTenancyFeatureEnabled(): boolean {
    return config.hasFeatureEnabled('repository-tenancy');
  }
</script>

<PageLayout>
  <h1>Service {view.service.name} - {view.service.version}</h1>
  <small>
    Created <TimeAgo ts={view.service.metadata.createdOn}/>, 
    last update on <MediumDate ts={view.service.metadata.lastUpdate}/>
  </small>

  <div>
    <LabelsList labels={view.service.metadata.labels}></LabelsList>
    <Button variant="link" onclick={() => {labelsDialogIsOpen = true}}>Edit Labels</Button>
    <LabelsDialog isOpen={labelsDialogIsOpen} 
      resourceName={`${view.service.name} - ${view.service.version}`} resourceType={'Service'} 
      labels={view.service.metadata.labels} onsave={updateLabels}></LabelsDialog>
  </div>

  <div>
    <h3 class="section-label">Properties</h3>
  </div>
  <dl>
    <dt>Service Type:</dt>
    <dd><ApiTag type="{view.service.type}"/></dd>
  </dl>

  <div>
    <a href="/tests/service/{view.service.id}">View Tests Runs</a>
  </div>


  <div>
    <h3 class="section-label">Operations</h3>
  </div>

  <div class="container">
    {#each view.service.operations as operation}
      <div class="flex">
        <Collapsible.Root>
          <div class="operation-chevron">
            <Collapsible.Trigger>
              <ChevronRight size="24" />
            </Collapsible.Trigger>
          </div>
          <div class="operation-content">
            <div class="operation-title">{operation.name}</div>
            <div class="operation-description">
              <span class="operation-method"></span>
              <span class="operation-dispatcher">
                with <code>{ operation.dispatcher }</code> dispatcher
              </span>
            </div>
          </div>
          <div class="operation-additional-content">
            <div>
              <span class="pficon pficon-image"> </span>
              <strong>{ view.messagesMap[operation.name].length }</strong> sample(s)
            </div>
          </div>
          <div class="operation-actions">

          </div>

          <Collapsible.Content>
            <h4 class="section-label">Dispatching Properties</h4>
            <div class="container">
              <div class="grid-cols-2">
                <dl>
                  {#if view.service.type === ServiceType.SOAP_HTTP}
                    <dt>SOAP Action:</dt>
                    <dd><code>{ operation.action }</code></dd>
                  {/if}
                  {#if !isEventTypeService()}
                    <dt>Dispatcher:</dt>
                    <dd>
                      <code>{ operation.dispatcher }</code> &nbsp;
                      <span class="learn-more-inline">
                        <a href="https://microcks.io/documentation/explanations/dispatching/" target="_blank" rel="noopener">Learn More
                          <i class="fa fa-external-link" aria-hidden="true"></i>
                        </a>
                      </span>
                    </dd>
                    <dt>Dispatching rules:</dt>
                    <dd><code class="code-block">{ operation.dispatcherRules }</code></dd>
                  {/if}
                  {#if isEventTypeService()}
                    <dt>Frequency:</dt>
                    <dd>
                      { operation.defaultDelay || 0 } s
                      {#if !isAsyncMockEnabled(operation)} 
                      <Badge>Mocks are disabled</Badge>
                      {/if}
                    </dd>
                    <dt>Available bindings:</dt>
                    <dd>
                      { getBindingsList(operation) } &nbsp;
                      <span class="learn-more-inline">
                        <a href="https://microcks.io/documentation/references/artifacts/asyncapi-conventions/#bindings" target="_blank" rel="noopener">Learn More
                          <i class="fa fa-external-link" aria-hidden="true"></i>
                        </a>
                      </span>
                    </dd>
                  {/if}
                </dl>
                <dl></dl>
              </div>
            </div>

            {#if operation.parameterConstraints && operation.parameterConstraints.length > 0}
            <h4 class="section-label">Parameter Constraints</h4>
            <div class="container">

            </div>  
            {/if}
            
            {#if view.service.type != ServiceType.GENERIC_REST}
            <h4 class="section-label">Mocks</h4>
            <div class="container">

            </div>
            {/if}
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    {/each}
  </div>

</PageLayout>

<style>

</style>