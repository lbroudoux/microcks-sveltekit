<script lang="ts">
  import WizardTotal from "$lib/components/wizard/WizardTotal.svelte";
  import PageLayout from "$lib/components/layouts/PageLayout.svelte";

  import { wizardConfigCreateImporters } from "$lib/utils/constants";
</script>

<PageLayout>
  <WizardTotal wizardConfig={wizardConfigCreateImporters} />
</PageLayout>
