<script>
  import { LayoutDashboard } from "lucide-svelte";

  import * as Tooltip from "$lib/components/ui/tooltip/index";
  import * as Avatar from "$lib/components/ui/avatar/index";
</script>

<div class="flex min-h-screen h-screen flex-col border-r">
  <aside
    class="bg-background inset-y-0 left-0 z-10 hidden w-14 flex-col sm:flex"
  >
    <nav class="flex flex-col items-center gap-4 px-2 py-4">
      <a
        href="##"
        class="text-primary-foreground group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
      >
        <Avatar.Root>
          <Avatar.Image
            class="w-full h-full rounded-full"
            src="https://avatars.githubusercontent.com/u/11051048?v=4"
            alt="@microcks"
          />
          <Avatar.Fallback>Microcks</Avatar.Fallback>
        </Avatar.Root>
      </a>
      <Tooltip.Root>
        <Tooltip.Trigger asChild let:builder>
          <a
            href="##"
            class="text-muted-foreground hover:text-foreground flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
            use:builder.action
            {...builder}
          >
            <LayoutDashboard class="h-5 w-5" />
            <span class="sr-only">Dashboard</span>
          </a>
        </Tooltip.Trigger>
        <Tooltip.Content side="right">Dashboard</Tooltip.Content>
      </Tooltip.Root>
    </nav>
  </aside>
</div>
