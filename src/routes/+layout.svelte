<script>
  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";

  import "../app.css";
</script>

<div class="w-screen h-screen">
  <Sidebar />
  <main>
    <slot />
  </main>
</div>
