<script lang="ts">
  import Ellipsis from "lucide-svelte/icons/ellipsis";

  import {
    Root,
    Trigger,
    Content,
    Item,
    Separator,
  } from "$lib/components/ui/dropdown-menu/index";
  import { Button } from "$lib/components/ui/button";

  export let id: string;
</script>

<Root>
  <Trigger asChild let:builder>
    <Button
      variant="ghost"
      builders={[builder]}
      size="icon"
      class="relative h-8 w-8 p-0"
    >
      <span class="sr-only">Open menu</span>
      <Ellipsis class="h-4 w-4" />
    </Button>
  </Trigger>
  <Content>
    <Item>
      <a href={`/services/${id}`}> Details</a></Item
    >
    <Separator />
    <Item>Delete</Item>
  </Content>
</Root>
