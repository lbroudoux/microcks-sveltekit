<script>
  import MenuSidebar from "$lib/components/sidebar/MenuSidebar.svelte";

  import { menus } from "$lib/utils/constants";
</script>

<aside
  class="bg-background fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r sm:flex"
>
  <nav class="flex flex-col items-center gap-4 px-2 py-4">
    <a
      href="/"
      class="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
    >
      <span class="sr-only">Acme Inc</span>
    </a>
    <!-- TOTO
    {#each menus as menu}
      <MenuSidebar {menu} />
    {/each}
    -->
    {#each menus as menu}
      <a
        href={menu.href}
        class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
      >
        <menu.icon class="h-5 w-5" />
        <span class="sr-only">{menu.title}</span>
      </a>
    {/each}
  </nav>
</aside>
