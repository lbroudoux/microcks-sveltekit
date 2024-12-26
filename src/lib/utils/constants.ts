import type { SvelteComponent } from "svelte";
import {
  LayoutDashboard,
  Plug,
  FileCog,
  Store,
  Shield,
  Settings,
  Tag,
  Lock,
} from "lucide-svelte";

import type { WizardConfig, Importer } from "$lib/utils/interfaces";
import type { MenuSidebar, SectionHeading } from "$lib/utils/interfaces";
import type { Service } from "$lib/models/service.model";
import { ServiceType } from "$lib/models/service.model";
import type { ApiType } from "$lib/utils/types";

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

export const data: Service[] = [
  {
    id: "1",
    name: "Service 1",
    version: "1.0.0",
    xmlNS: "http://service1.com",
    type: ServiceType.REST,
    operations: [
      {
        name: "Operation 1",
        method: "GET",
        action: "get",
        inputName: "input",
        outputName: "output",
        bindings: { string: [] },
        dispatcher: "dispatcher",
        dispatcherRules: "rules",
        defaultDelay: 0,
        resourcePaths: ["/path1"],
        parameterConstraints: [],
      },
    ],
    metadata: {
      createdOn: 0,
      lastUpdate: 0,
      annotations: {},
      labels: {},
    },
    sourceArtifact: "artifact",
  },
];

export const wizardConfigCreateImporters: WizardConfig = {
  triggerValue: "Create",
  submitValue: "Create",
  title: "Create a new job",
  steps: [
    {
      icon: Settings as typeof SvelteComponent,
      title: "Importer properties",
      stepName: "Importer Job properties",
      inputs: [
        {
          label: "Name",
          name: "name",
          description:
            "The name this import job will have for later controlling it (should be unique).",
          placeholder: "eg. My Job Name",
          type: "text",
          required: true,
        },
        {
          label: "Repository URL",
          name: "repositoryUrl",
          description:
            "The URL we'll use to scan your project (may be a Git or Subversion repository).",
          placeholder:
            "eg. http://git.mycompany.com/repos/master/MyRepository.xml",
          type: "text",
          required: true,
        },
        {
          label: "Just merge examples into existing API | Service definition.",
          name: "isSecondaryArtifact",
          description: "Is a Secondary Artifact ?",
          type: "checkbox",
        },
      ],
    },
    {
      icon: Lock as typeof SvelteComponent,
      title: " Authentification secret",
      stepName: "Authentification options",
      inputs: [
        {
          label:
            "Select an Authentification Secret (should be an existing one)",
          name: "useAuthentificationSecret",
          description: "Use Authentification Secret ?",
          type: "checkbox",
        },
      ],
    },
    {
      icon: Tag as typeof SvelteComponent,
      title: "Labels",
      description:
        "Labels help you organize and select resources. Adding labels below will let you query for objects that have similar, overlapping or dissimilar labels.",
      inputs: [
        {
          label: "Labels for ",
          name: "labels",
          placeholder: "domain=frontend",
          type: "textarea",
        },
      ],
    },
  ],
};

export const importers: Importer[] = [
  {
    id: "0",
    name: "Importer 1",
    href: "/importers/1",
    version: "1.1.0",
  },
  {
    id: "1",
    name: "Importer 2",
    href: "/importers/2",
    version: "1.0.0",
  },
  {
    id: "2",
    name: "Importer 3",
    href: "/importers/3",
    version: "1.0.0",
  },
  {
    id: "3",
    name: "Importer 4",
    href: "/importers/4",
    version: "1.0.0",
  },
  {
    id: "4",
    name: "Importer 5",
    href: "/importers/5",
    version: "1.0.0",
  },
];

export const apiTypes: ApiType[] = [
  { name: "REST", color: "rest" },
  { name: "GRAPHQL", color: "blue" },
  { name: "GRPC", color: "grpc" },
];
