<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  export let data: PageData;

  onMount(() => {
    console.log("In page /importers onMount()");
  })
</script>

<style>

</style>