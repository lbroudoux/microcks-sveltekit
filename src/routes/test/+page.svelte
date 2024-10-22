<script lang="ts">
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  const sectionHeading = {
    title: "Import Jobs",
    description:
      "Importers periodically scan source code repositories to check for update in your Services and API mock definitions.",
  };
</script>

<SectionHeading {sectionHeading}>
  <div slot="headingActions" class="flex flex-row gap-2">
    <Button variant="default">Create Job</Button>
  </div>
</SectionHeading>
