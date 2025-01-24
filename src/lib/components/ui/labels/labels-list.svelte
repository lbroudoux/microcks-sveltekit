<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";

  interface Props {
    labels: Record<string, string>;
    filter?: string;
  }

  let { labels, filter }: Props = $props();

  const filteredLabels = filter != undefined ? filter.split(",") : [];
</script>

{#if labels != null && labels != undefined}
  {#each Object.keys(labels) as label}
    {#if filteredLabels.length == 0 || filteredLabels.includes(label)}
      <Badge variant="secondary">{label}={labels[label]}</Badge>
    {/if}
  {/each}
{/if}
