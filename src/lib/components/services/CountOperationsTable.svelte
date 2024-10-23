<script lang="ts">
  import Settings from "lucide-svelte/icons/settings";

  export let count: number;
</script>

<div class="flex items-center flex-row gap-2">
  <Settings strokeWidth={2} class="ml-2 w-5 h-5" />
  {count} operation{count > 1 ? "s" : ""}
</div>
