<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import { Settings, Tag } from "lucide-svelte";

  import SectionLayout from "@/components/SectionLayout.svelte";
  import Wizard from "@/components/wizard/Wizard.svelte";

  import type { WizardConfig } from "@/utils/interfaces";

  let wizard: WizardConfig = {
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
            label:
              "Just merge examples into existing API | Service definition.",
            name: "isSecondaryArtifact",
            description: "Is a Secondary Artifact ?",
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
</script>

<SectionLayout>
  <Wizard {wizard} />
</SectionLayout>
