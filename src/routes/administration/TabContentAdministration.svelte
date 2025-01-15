<script lang="ts">
  import Content from "$lib/components/ui/tabs/tabs-content.svelte";

  import type { TabContentAdministration } from "$lib/utils/interfaces";

  interface Props {
    tab: TabContentAdministration;
    tabAction?: import('svelte').Snippet;
    tabContent?: import('svelte').Snippet;
  }

  let { tab, tabAction, tabContent }: Props = $props();
</script>

<Content value={tab.value} class="p-4 space-y-1">
  <div class="w-full flex flex-row items-start justify-between">
    <div class="flex flex-col items start justify-start">
      <h3 class="text-xl">{tab.title}</h3>
      <p class="text-muted-foreground text-sm">{tab.description}</p>
    </div>
    {@render tabAction?.()}
  </div>
  {@render tabContent?.()}
</Content>
