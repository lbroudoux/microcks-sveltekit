<script lang="ts">
  import WizardInput from "$lib/components/ui/wizard/WizardInput.svelte";

  import type { WizardStep } from "$lib/utils/interfaces";

  export let step: WizardStep;
</script>

<div class="flex flex-col items-start justify-start gap-4 py-4">
  <div class="inline-flex gap-2 font-medium">
    {#if step.icon}
      <svelte:component this={step.icon} />
    {/if}
    <p>{step.title}</p>
  </div>
  {#if step.description}
    <p class="text-sm text-muted-foreground">{step.description}</p>
  {/if}

  {#each step.inputs as input}
    <WizardInput {input} />
  {/each}
</div>
