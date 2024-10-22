import { LayoutDashboard, Plug, FileCog, Store, Shield } from "lucide-svelte";

import type { MenuSidebar } from "@/interfaces";
import type { SvelteComponent } from "svelte";

export let menus: MenuSidebar[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard as typeof SvelteComponent,
  },
  {
    title: "API | Services",
    href: "/services",
    icon: Plug as typeof SvelteComponent,
  },
  {
    title: "Importers",
    href: "/importers",
    icon: FileCog as typeof SvelteComponent,
  },
  {
    title: "Microcks Hub",
    href: "/hub",
    icon: Store as typeof SvelteComponent,
  },
  {
    title: "Administration",
    href: "/administration",
    icon: Shield as typeof SvelteComponent,
  },
];
