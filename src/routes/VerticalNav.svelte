<script>
  import { LayoutDashboard } from 'lucide-svelte';

  import * as Tooltip from "$lib/components/ui/tooltip/index.ts";
</script>

<div class="bg-muted/40 flex min-h-screen w-full flex-col">
  <aside class="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
    <nav class="flex flex-col items-center gap-4 px-2 py-4">
      <a href="##"
        class="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base">
        
        <span class="sr-only">Acme Inc</span>
      </a>
      <Tooltip.Root>
        <Tooltip.Trigger asChild let:builder>
          <a
            href="##"
            class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
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