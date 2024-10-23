<script lang="ts">
  import { onMount } from "svelte";

  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";

  import { shAdministration } from "$lib/utils/constants";

  onMount(() => {
    console.log("In page /administration onMount()");
  });
</script>

<PageLayout>
  <SectionHeading sectionHeading={shAdministration} />
  <p>Administration page</p>
</PageLayout>
