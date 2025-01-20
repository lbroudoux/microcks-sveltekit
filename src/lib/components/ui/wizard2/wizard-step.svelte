<script lang="ts">
  import type { WizardStepConfig } from './index';

  interface Props {
    config: WizardStepConfig;
    view: import('svelte').Snippet;
    review?: import('svelte').Snippet;
  }

  let { config, view, review }: Props = $props();
</script>

<b>Wizard Step {config.id}</b>