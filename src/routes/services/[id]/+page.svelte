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
    <p>
      Service {service.name} - {service.version} 
    </p>
  {:catch error}
    <p>error loading service: {error.message}</p>
  {/await}
</div>   

<style>

</style>