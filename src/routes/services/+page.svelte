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
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Pagination from "$lib/components/ui/pagination";
  import { shServices } from "$lib/utils/constants";
  import type { Service } from "$lib/models/service.model";
  import ApiTag from "$lib/components/ui/api-tag/api-tag.svelte";
  import ApiTypeBadge from "$lib/components/ui/api-type-badge/api-type-badge.svelte";
  import ApiTypeIcon from "$lib/components/ui/api-type-icon/api-type-icon.svelte";

  import { getServices } from "$lib/services/services.service";

  let { data }: { data: PageData } = $props();

  const services: Service[] = data.services;
  const servicesCount: Promise<number> = data.servicesCount;
  const servicesLabels: Promise<Map<string, string[]>> = data.servicesLabels;
  const isDesktop = new MediaQuery("(min-width: 768px)");
  const count = 18;
  const perPage = $derived(isDesktop.current ? 5 : 3);
  const siblingCount = $derived(isDesktop.current ? 2 : 1);

  onMount(() => {
    console.log("In page /services onMount()");
  });

  function selectService(service: Service) {
    console.log("Selected service: ", service);
  }

  function pageChange(page: number) {
    console.log("Page changed to: ", page);
    getServices(page, 5).then((services) => {
      data.services = services;
    });
  }
</script>

<PageLayout>
  <SectionHeading sectionHeading={shServices}>
    <!-- {#snippet headingActions()}
      <Button >+ Add Direct API</Button>
    {/snippet} -->
  </SectionHeading>
  {#await data.services}
    <Loader />
  {:then services}
    <Table.Root>
      {#each services as service}
        <Table.Row>
          <Table.Cell>
            <ApiTypeIcon type="{ service.type }" />
          </Table.Cell>
          <Table.Cell>
            <h4>
              <a href="/services/{ service.id }" class="font-semibold text-base">
                { service.name }
              </a>
            </h4>
          </Table.Cell>
          <Table.Cell>
            <ApiTypeBadge type="{ service.type }" />
            <span class="text-base font-regular">
              | v{ service.version } |
            </span>
            <!-- <br />
            <div style="margin-top: 10px">
              <small>Updated on { service.metadata.lastUpdate }</small>
            </div> -->
          </Table.Cell>
          <Table.Cell class="flex flex-row gap-1 items-center justify-center">
              <Cog />{ service.operations.length } Operations
          </Table.Cell>
          <Table.Cell class="text-right">
            <Button variant="outline">
              <a href={`/services/${service.id}`}> Details</a>
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

    <div>
      {#await data.servicesCount}
      <Loader />
      {:then servicesCount}
        Got { servicesCount.counter } services
      {:catch error}
        <p>error loading services: {error.message}</p>
      {/await}  
    </div>

    <Pagination.Root {count} perPage={perPage} siblingCount={siblingCount} onPageChange={(page) => pageChange(page)}>
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

  {:catch error}
    <p>error loading services: {error.message}</p>
  {/await}
</PageLayout>

<!-- <style>
.serviceName {
  flex-basis: 40%;
  max-width: 300px;
  display: inline-block;
  word-wrap: break-word;
  word-break: break-all;
}
.serviceMetadata {
  flex-basis: 60%;
  display: inline-block;
  word-wrap: break-word;
  word-break: break-all;
}

.list-view-pf-view {
  background: #ededed;
  border: none;
  margin-top: 30px;
}

.list-group {
  padding-left: 0;
  margin-bottom: 20px;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #f5f5f5;
}

.list-view-pf-main-info {
  align-items: flex-start;
  display: flex;
  flex: 1;
  min-width: 0;
  padding-bottom: 20px;
  padding-top: 20px;
}

.list-view-pf-left {
  display: table-cell;
  padding-right: 20px;
  text-align: center;
  vertical-align: top;
}

.list-view-pf-body {
  -ms-flex-align: center;
  -ms-grid-row-align: center;
  align-items: center;
  display: table-cell;
  flex: 1;
  min-width: 0;
  vertical-align: top;
  width: 100%;
}

.list-view-pf-description {
  flex: 1 0 50%;
  flex-basis: 70%;
}

.list-view-pf-additional-info {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}

.list-view-pf-additional-info-item {
  align-items: center;
  display: inline-block;
  display: flex;
  margin-right: 20px;
  max-width: 100%;
  text-align: center;
}

.list-view-pf-actions {
  float: right;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-top: 20px;
  order: 2;
}

@media (min-width: 992px) {
  .list-view-pf-body {
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  .list-view-pf-description {
    align-items: center;
    display: flex;
    float: left;
    width: 50%;
  }

  .list-view-pf-additional-info {
    flex: 1 0 auto;
    float: left;
    width: 50%;
  }
}
</style> -->