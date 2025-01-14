<script lang="ts">
  import {
    createTable,
    Render,
    Subscribe,
    createRender,
  } from "svelte-headless-table";
  import { readable } from "svelte/store";
  import { addPagination, addTableFilter } from "svelte-headless-table/plugins";

  import ActionsTableServices from "./ActionTableServices.svelte";
  import CountOperationsTable from "./CountOperationsTable.svelte";
  import {
    Root,
    Header,
    Row,
    Head,
    Body,
    Cell,
  } from "$lib/components/ui/table";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  import type { Service } from "$lib/models/service.model";
  import { getIconServiceType } from "$lib/utils/icons";

  export let services: Service[] = [];

  const table = createTable(readable(services), {
    page: addPagination(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
  });
  const columns = table.createColumns([
    table.column({
      header: "Type",
      accessor: (row) => row.type,
      cell: (item) => {
        const Icon = getIconServiceType(item.value);
        return createRender(Icon);
      },
    }),
    table.column({
      accessor: "name",
      header: "Name",
    }),
    table.column({
      accessor: "version",
      header: "Version",
      plugins: {
        filter: {
          exclude: true,
        },
      },
    }),
    table.column({
      header: "Operations",
      accessor: (row) => row.operations?.length ?? 0,
      cell: (item) => {
        const count = item.value;
        return createRender(CountOperationsTable, { count });
      },
      plugins: {
        filter: {
          exclude: true,
        },
      },
    }),
    table.column({
      header: "",
      accessor: ({ id }: { id: string }) => id,
      cell: (item) => {
        return createRender(ActionsTableServices, { id: String(item.value) });
      },
    }),
  ]);
  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);
  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
</script>

<div class="my-8">
  <div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Filter..."
      type="text"
      bind:value={$filterValue}
    />
  </div>
  <div class="rounded-md border">
    <Root {...$tableAttrs}>
      <Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Head {...attrs}>
                    <Render of={cell.render()} />
                  </Head>
                </Subscribe>
              {/each}
            </Row>
          </Subscribe>
        {/each}
      </Header>
      <Body {...$tableBodyAttrs}>
        {#if $pageRows.length === 0}
          <Row>
            <Cell colspan={5} class="text-center py-2">No services found</Cell>
          </Row>
        {:else}
          {#each $pageRows as row (row.id)}
            <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
              <Row {...rowAttrs}>
                {#each row.cells as cell (cell.id)}
                  <Subscribe attrs={cell.attrs()} let:attrs>
                    <Cell {...attrs}>
                      <Render of={cell.render()} />
                    </Cell>
                  </Subscribe>
                {/each}
              </Row>
            </Subscribe>
          {/each}
        {/if}
      </Body>
    </Root>
  </div>
  <div class="flex items-center justify-end space-x-4 py-4">
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>
