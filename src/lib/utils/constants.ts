import type { SvelteComponent } from "svelte";
import { LayoutDashboard, Plug, FileCog, Store, Shield } from "lucide-svelte";

import type { MenuSidebar, SectionHeading } from "$lib/utils/interfaces";

export const menus: MenuSidebar[] = [
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

export const shServices: SectionHeading = {
  title: "APIs & Services",
  description:
    "These are the APIs | Services managed by Microcks. You can discover new ones adding Import Job or creating a new Direct API...",
};

export const shImporters: SectionHeading = {
  title: "Import Jobs",
  description:
    "Importers periodically scan source code repositories to check for update in your Services and API mock definitions.",
};

export const shAdministration: SectionHeading = {
  title: "Administration",
  description:
    "Use this section to manage your Users, export and import repository Snapshots and manage Secrets.",
};
