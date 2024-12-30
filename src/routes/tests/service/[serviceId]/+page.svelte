<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  import PageLayout from '$lib/components/layouts/PageLayout.svelte';
  
  export let data: PageData;

  onMount(() => {
    console.log("In page /tests/service/[serviceId] onMount()");
  });
</script>

<PageLayout>
  {#await data.service}
    Loading service...
  {:then service}
    <h1>Test History for {service.name} - {service.version}</h1>
    <small>These are the conformance tests that have been run against this service implementations on different
      endpoints.</small>
  {:catch error}
    <p>error loading service: {error.message}</p>
  {/await}
</PageLayout>
