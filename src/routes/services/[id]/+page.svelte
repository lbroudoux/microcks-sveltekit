<script lang="ts">
  import ApiTag from '$lib/components/ui/api-tag/api-tag.svelte';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import { MediumDate, TimeAgo } from "$lib/components/ui/time";

  import type { Service } from "$lib/models/service.model";
  import { LabelsDialog, LabelsList } from '$lib/components/ui/labels';
  import Button from '$lib/components/ui/button/button.svelte';

  import { updateServiceMetadata } from '$lib/services/services.service';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let service: Service = $state(data.service);

  onMount(() => {
    console.log("In page /services/[id] onMount()");
  })

  let labelsDialogIsOpen: boolean = $state(false);

  function updateLabels(labels: Record<string, string>): void {
    console.log("updateLabels() called with:", labels);
    service.metadata.labels = labels;
    updateServiceMetadata(service, service.metadata)
        .then((updatedService) => {
          service = updatedService;
        })
        .catch((error) => {
          console.error("Error updating service metadata:", error);
        }); 
  }
</script>

<PageLayout>
  
  <h1>Service {service.name} - {service.version}</h1>
  <small>Created <TimeAgo ts={service.metadata.createdOn}/>, last update on <MediumDate ts={service.metadata.lastUpdate}/></small>

  <div>
    <LabelsList labels={service.metadata.labels}></LabelsList>
    <Button variant="link" onclick={() => {labelsDialogIsOpen = true}}>Edit Labels</Button>
    <LabelsDialog isOpen={labelsDialogIsOpen} 
      resourceName={`${service.name} - ${service.version}`} resourceType={'Service'} 
      labels={service.metadata.labels} onsave={updateLabels}></LabelsDialog>
  </div>

  <h3>Properties</h3>
  <dl>
    <dt>Service Type:</dt>
    <dd><ApiTag type="{service.type}"/></dd>
  </dl>

  <div>
    <a href="/tests/service/{service.id}">View Tests Runs</a>
  </div>
</PageLayout>

<style>

</style>