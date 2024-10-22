<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  export let data: PageData;

  onMount(() => {
    console.log("In page /services onMount()");
  })
</script>

<div>
  {#await data.services}
    Loading services...
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
</div>   

<style>

</style>