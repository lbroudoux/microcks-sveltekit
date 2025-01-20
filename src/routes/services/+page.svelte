<script lang="ts">
  import { onMount } from "svelte";
  import { MediaQuery } from "svelte/reactivity";
  import type { PageData } from "./$types";
  import { ChevronLeft, ChevronRight, Cog, Delete, Ellipsis } from "lucide-svelte";

  import TableServices from "./TableServices.svelte";
  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import Loader from "$lib/components/global/Loader.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Table from "$lib/components/ui/table";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Pagination from "$lib/components/ui/pagination";
  import { shServices } from "$lib/utils/constants";
  import type { Service } from "$lib/models/service.model";
  import ApiTag from "$lib/components/ui/api-tag/api-tag.svelte";
  import ApiTypeBadge from "$lib/components/ui/api-type-badge/api-type-badge.svelte";
  import ApiTypeIcon from "$lib/components/ui/api-type-icon/api-type-icon.svelte";

  import { getServices } from "$lib/services/services.service";
  import MediumDate from "$lib/components/ui/time";
  import { Wizard, Wizard2, WizardStep, type WizardStepConfig } from "$lib/components/ui/wizard2";
  import DirectApiWizard from "./direct-api-wizard.svelte";
  import LabelsList from "$lib/components/ui/labels/labels-list.svelte";
    

  let { data }: { data: PageData } = $props();

  let services: Service[] = $state(data.services);
  const servicesLabels: Promise<Map<string, string[]>> = data.servicesLabels;

  const isDesktop = new MediaQuery("(min-width: 768px)");
  const perPage = $derived(isDesktop.current ? 5 : 3);
  const siblingCount = $derived(isDesktop.current ? 2 : 1);

  onMount(() => {
    console.log("In page /services onMount()");
  });

  function pageChange(page: number) {
    getServices(page, 5).then((newServices) => {
      services = newServices;
    });
  }

  let wizardIsOpen: boolean = $state(false);
  let wizard2IsOpen: boolean = $state(false);

  const step1Config: WizardStepConfig = {
    id: 'step1',
    title: 'Direct API type',
    nextEnabled: true,
    expandReviewDetails: true,
  };
  const step2Config: WizardStepConfig = {
    id: 'step2',
    title: 'API properties',
    nextEnabled: true,
    expandReviewDetails: true,
  };

  function openCreateDirectAPI(): void {
    //wizardIsOpen = true;
    wizard2IsOpen = true;
  }
</script>

{#snippet step1View()}
  <h3>Step 1</h3>
{/snippet}
{#snippet step2View()}
  <h3>Step 2</h3>
{/snippet}

{#snippet step1Review()}
  <li>Review of Step 1</li>
{/snippet}
{#snippet step2Review()}
  <li>Review of Step 2</li>
{/snippet}

<DirectApiWizard isOpen={wizard2IsOpen} />

<PageLayout>
  <SectionHeading sectionHeading={shServices}>
    {#snippet headingActions()}
      <Button onclick={openCreateDirectAPI}>+ Add Direct API</Button>
    {/snippet}
  </SectionHeading>

  <!-- 
  <Wizard isOpen={wizardIsOpen}>
    <WizardStep config={step1Config}>
      {#snippet view()}
        <h3>Step 1</h3>
      {/snippet}

      {#snippet review()}
        <li>Review of Step 1</li>
      {/snippet}
    </WizardStep>
    <WizardStep config={step2Config}>
      {#snippet view()}
        <h3>Step 2</h3>
      {/snippet}

      {#snippet review()}
        <li>Review of Step 2</li>
      {/snippet}
    </WizardStep>
  </Wizard>
  -->

  <!-- 
  <Wizard2 isOpen={wizardIsOpen} stepConfigs={[step1Config, step2Config]} 
      stepViews={[step1View, step2View]} 
      stepReviews={[step1Review, step2Review]}>
  </Wizard2>
  -->
  
  <Table.Root class="my-4">
    {#each services as service}
      <Table.Row>
        <Table.Cell>
          <ApiTypeIcon type="{service.type}" />
        </Table.Cell>
        <Table.Cell>
          <h4>
            <a href="/services/{service.id}" class="font-semibold text-base">
              { service.name }
            </a>
          </h4>
        </Table.Cell>
        <Table.Cell>
          <ApiTypeBadge type="{service.type}" />
          | Version {service.version} | <LabelsList labels={service.metadata.labels} filter={`domain,status`}/>
          <br/> 
          Updated on <MediumDate ts={service.metadata.lastUpdate}/>
        </Table.Cell>
        <Table.Cell class="flex flex-row gap-1 items-center justify-center">
          <Tooltip.Provider>
            <Tooltip.Root delayDuration={200}>
              <Tooltip.Trigger>
                <Cog /><strong>{service.operations.length}</strong> Operations
              </Tooltip.Trigger>
              <Tooltip.Content>
                Operations
                <ul>
                  {#each service.operations as operation}
                    <li>{operation.name}</li>
                  {/each}
                </ul>
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </Table.Cell>
        <Table.Cell class="text-right">
          <Button variant="outline">
            <a href={`/services/${service.id}`}>Details</a>
          </Button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <span class="sr-only">Open menu</span>
              <Ellipsis class="h-4 w-4" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <Delete class="mr-2 size-4" />
                <span>Delete</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Table.Cell>
      </Table.Row> 
    {/each}
  </Table.Root>

  <div class="w-full flex flex-row items-center justify-between py-4">
    {#await data.servicesCount}
      <Loader />
    {:then servicesCount}
      <Pagination.Root count={servicesCount.counter} perPage={perPage} siblingCount={siblingCount} onPageChange={(page) => pageChange(page)}>
        {#snippet children({ pages, currentPage })}
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.PrevButton>
                <ChevronLeft class="size-4" />
                <span class="hidden sm:block">Previous</span>
              </Pagination.PrevButton>
            </Pagination.Item>
            {#each pages as page (page.key)}
              {#if page.type === "ellipsis"}
                <Pagination.Item>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              {:else}
                <Pagination.Item>
                  <Pagination.Link {page} isActive={currentPage === page.value}>
                    {page.value}
                  </Pagination.Link>
                </Pagination.Item>
              {/if}
            {/each}
            <Pagination.Item>
              <Pagination.NextButton>
                <span class="hidden sm:block">Next</span>
                <ChevronRight class="size-4" />
              </Pagination.NextButton>
            </Pagination.Item>
          </Pagination.Content>
        {/snippet}
      </Pagination.Root>
    {:catch error}
      Error loading number of services: {error.message}
    {/await}
  </div>

  <!-- <TableServices {services} /> -->

  <!--
  <div class="list-group list-view-pf list-view-pf-view">
    {#each services as service}
      <div class="list-group-item">
        <div class="list-view-pf-main-info" onmouseenter={() => selectService(service)}>
          <div class="list-view-pf-left">
            <ApiTypeIcon type="{ service.type }" />
          </div>

          <div class="list-view-pf-body">
            <div class="list-view-pf-description">
              <div class="list-group-item-heading serviceName">
                <h4><a href="/services/{ service.id }">{ service.name }</a></h4>
              </div>
              <div class="list-group-item-text serviceMetadata">
                <ApiTypeBadge type="{ service.type }" />
                | Version <b>{ service.version }</b>
                | 
                <br />
                <div style="margin-top: 10px">
                  <small>Updated on { service.metadata.lastUpdate }</small>
                </div>
              </div>
            </div>
            <div class="list-view-pf-additional-info">
              <div class="list-view-pf-additional-info-item" placement="right">
                <Cog /> <strong>{ service.operations.length }</strong>  Operations
              </div>
            </div>
          </div>

          <div class="list-view-pf-actions">
          </div>
        </div>
      </div>
    {/each}
  </div>
  -->
</PageLayout>