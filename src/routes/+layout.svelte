<script>
  import VerticalNav from "$lib/components/VerticalNav.svelte";

  import "../app.css";
</script>

<div class="flex flex-row h-screen w-screen">
  <VerticalNav />

  <main class="w-full h-full">
    <slot />
  </main>
</div>
