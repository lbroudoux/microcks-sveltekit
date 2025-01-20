<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";

  interface Props {
    labels: Record<string, string>;
  }

  let { labels }: Props = $props();
</script>

{#if labels != null && labels != undefined}
  {#each Object.keys(labels) as label}
    <Badge variant="secondary">{label}={ labels[label] }</Badge>
  {/each}
{/if}