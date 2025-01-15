<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  
  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  onMount(() => {
    console.log("In page /tests onMount()");
  });
</script>

<PageLayout>

</PageLayout>
