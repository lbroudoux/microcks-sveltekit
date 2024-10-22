<script>
  import Sidebar from "@/components/Sidebar/Sidebar.svelte";

  import "../app.css";
</script>

<div class="w-screen h-screen">
  <Sidebar />
  <main class="h-full w-full ml-16">
    <slot />
  </main>
</div>
