<script lang="ts">
  import { Root, Trigger, Content } from "@/components/ui/tooltip/index";

  import type { MenuSidebar } from "@/interfaces";

  export let menu: MenuSidebar;
</script>

<Root>
  <Trigger asChild let:builder>
    <a
      href={menu.href}
      class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
      use:builder.action
      {...builder}
    >
      <svelte:component this={menu.icon} class="h-5 w-5" />
      <span class="sr-only">{menu.title}</span>
    </a>
  </Trigger>
  <Content side="right">{menu.title}</Content>
</Root>
