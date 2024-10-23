<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  import TableServices from "$lib/components/services/TableServices.svelte";
  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import Loader from "$lib/components/global/Loader.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  import { shServices } from "$lib/utils/constants";
  import type { Service } from "$lib/models/service.model";

  export let data: PageData;

  const services: Service[] = data.services;

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
    <TableServices {services} />
  {:catch error}
    <p>error loading services: {error.message}</p>
  {/await}
</PageLayout>
