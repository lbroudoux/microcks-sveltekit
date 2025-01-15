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
  {#snippet headingActions()}
    <Button  variant="default">Create Job</Button>
  {/snippet}
</SectionHeading>
