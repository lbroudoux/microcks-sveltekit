<script>
  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import MainLayout from "$lib/components/layouts/MainLayout.svelte";
  import { Toaster } from "$lib/components/ui/sonner/index";

  import "../app.css";
</script>

<div class="w-screen h-screen">
  <Sidebar />
  <MainLayout>
    <slot />
  </MainLayout>
</div>

<Toaster />
