<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  export let data: PageData;

  onMount(() => {
    console.log("In page /services/[id] onMount()");
  })
</script>

<div>
  {#await data.service}
    Loading service...
  {:then service}
    <h1>Service {service.name} - {service.version}</h1>
    <small>Created {service.metadata.createdOn}, last update on {service.metadata.lastUpdate}</small>

    <div>
      <a href="/tests/service/{service.id}">View Tests Runs</a>
    </div>
  {:catch error}
    <p>error loading service: {error.message}</p>
  {/await}
</div>   

<style>

</style>