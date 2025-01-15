<script lang="ts">
  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import MainLayout from "$lib/components/layouts/MainLayout.svelte";
  import { Toaster } from "$lib/components/ui/sonner/index";

  import "../app.css";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="w-screen h-screen">
  <Sidebar />
  <MainLayout>
    {@render children?.()}
  </MainLayout>
</div>

<Toaster />
