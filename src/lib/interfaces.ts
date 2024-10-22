import type { SvelteComponent } from "svelte";

export interface MenuSidebar {
  title: string;
  href: string;
  icon: typeof SvelteComponent;
}
