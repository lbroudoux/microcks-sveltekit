<script lang="ts">
  import { page } from "$app/state";

  import {
    Root,
    Trigger,
    Content,
    Provider,
  } from "$lib/components/ui/tooltip/index";
  import type { MenuSidebar } from "$lib/utils/interfaces";

  interface Props {
    menu: MenuSidebar;
  }

  let { menu }: Props = $props();
  let isActive = $derived(
    menu.href === "/"
      ? page.url.pathname === "/"
      : page.url.pathname.startsWith(menu.href)
  );
</script>

<Provider>
  <Root>
    <Trigger>
      <a
        href={menu.href}
        class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 {isActive
          ? 'bg-muted'
          : ''}"
      >
        <menu.icon class="h-5 w-5" />
        <span class="sr-only">{menu.title}</span>
      </a>
    </Trigger>
    <Content side="right">Hello</Content>
  </Root>
</Provider>
