<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  import TableServices from "./TableServices.svelte";
  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import Loader from "$lib/components/global/Loader.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  import { shServices } from "$lib/utils/constants";
  import type { Service } from "$lib/models/service.model";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const services: Service[] = data.services;

  onMount(() => {
    console.log("In page /services onMount()");
  });
</script>

<PageLayout>
  <SectionHeading sectionHeading={shServices}>
    {#snippet headingActions()}
      <Button >+ Add Direct API</Button>
    {/snippet}
  </SectionHeading>
  {#await data.services}
    <Loader />
  {:then services}
    <!-- <TableServices {services} /> -->
  {:catch error}
    <p>error loading services: {error.message}</p>
  {/await}
</PageLayout>
