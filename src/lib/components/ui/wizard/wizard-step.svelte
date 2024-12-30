<script lang="ts">
  import { WizardInput } from "$lib/components/ui/wizard";

  import type { WizardStep } from "$lib/utils/interfaces";

  export let step: WizardStep;
</script>

<div class="flex flex-col items-start justify-start gap-4 py-4">
  <div class="inline-flex items-center gap-2 font-medium text-lg">
    {#if step.icon}
      <svelte:component this={step.icon} class="w-5 h-5" />
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
