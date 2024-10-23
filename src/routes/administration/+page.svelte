<script lang="ts">
  import { onMount } from "svelte";

  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import TabsAdministration from "$lib/components/administration/TabsAdministration.svelte";

  import { shAdministration } from "$lib/utils/constants";

  onMount(() => {
    console.log("In page /administration onMount()");
  });
</script>

<PageLayout>
  <SectionHeading sectionHeading={shAdministration} />
  <TabsAdministration />
</PageLayout>
