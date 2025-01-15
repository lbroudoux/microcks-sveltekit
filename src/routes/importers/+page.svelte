<script lang="ts">
  import { onMount } from "svelte";
  import { Upload, Plus } from "lucide-svelte";

  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  import { shImporters } from "$lib/utils/constants";
  import TableImporters from "$lib/components/importers/TableImporters.svelte";

  onMount(() => {
    console.log("In page /importers onMount()");
  });
</script>

<PageLayout>
  <SectionHeading sectionHeading={shImporters}>
    {#snippet headingActions()}
      <div class="w-full flex flex-row gap-2 items-center justify-end">
        <Button variant={"outline"}>
          <Upload size={16} />
          Upload
        </Button>
        <Button>
          <Plus size={16} />
          Create
        </Button>
      </div>
    {/snippet}
  </SectionHeading>
  <!-- <TableImporters /> -->
</PageLayout>
