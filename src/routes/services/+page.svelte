<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import Loader from "$lib/components/global/Loader.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  import { shServices } from "$lib/utils/constants";

  export let data: PageData;

  onMount(() => {
    console.log("In page /services onMount()");
  });
</script>

<PageLayout>
  <SectionHeading sectionHeading={shServices}>
    <Button slot="headingActions">+ Add Direct API</Button>
  </SectionHeading>
  {#await data.services}
    <Loader />
  {:then services}
    {#each services as service}
      <p>
        Service {service.name} - {service.version}
        <a href="/services/{service.id}">Details</a>
      </p>
    {/each}
  {:catch error}
    <p>error loading services: {error.message}</p>
  {/await}
</PageLayout>
