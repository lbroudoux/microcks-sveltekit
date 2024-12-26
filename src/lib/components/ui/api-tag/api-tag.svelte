<script lang="ts">
  import Badge from "$lib/components/ui/badge/badge.svelte";
</script>

<Badge {...$$props}>
  <slot />
</Badge>
