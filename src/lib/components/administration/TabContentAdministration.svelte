<script lang="ts">
  import Content from "$lib/components/ui/tabs/tabs-content.svelte";

  import type { TabContentAdministration } from "$lib/utils/interfaces";

  export let tab: TabContentAdministration;
</script>

<Content value={tab.value} class="py-2 space-y-1">
  <h3 class="text-xl">{tab.title}</h3>
  <p class="text-muted-foreground text-sm">{tab.description}</p>
  <slot name="tabContent" />
</Content>
