<script lang="ts">
  import Wizard from "$lib/components/ui/wizard";
  import PageLayout from "$lib/components/layouts/PageLayout.svelte";

  import { wizardConfigCreateImporters } from "$lib/utils/constants";
</script>

<PageLayout>
  <!-- <Wizard wizardConfig={wizardConfigCreateImporters} /> -->
  <Wizard wizardConfig={wizardConfigCreateImporters} />
</PageLayout>
