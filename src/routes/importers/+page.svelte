<script lang="ts">
  import { onMount } from "svelte";

  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  import { shImporters } from "$lib/utils/constants";

  onMount(() => {
    console.log("In page /importers onMount()");
  });
</script>

<PageLayout>
  <SectionHeading sectionHeading={shImporters}>
    <div
      slot="headingActions"
      class="w-full flex flex-row gap-2 items-center justify-end"
    >
      <Button variant={"outline"}>Upload</Button>
      <Button>+ Create</Button>
    </div>
  </SectionHeading>
</PageLayout>
