<script lang="ts">
  import { onMount } from "svelte";

  import TabsAdministration from "./TabsAdministration.svelte";
  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import Dropzone from "$lib/components/ui/dropzone";

  import { shAdministration } from "$lib/utils/constants";

  onMount(() => {
    console.log("In page /administration onMount()");
  });
</script>

<PageLayout>
  <SectionHeading sectionHeading={shAdministration} />
  <TabsAdministration />
</PageLayout>
