<script lang="ts">
  import { onMount } from "svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Collapsible from "$lib/components/ui/collapsible";
  import type { WizardConfig, WizardStepConfig } from ".";

  interface Props {
    isOpen: boolean;
    wizardConfig: WizardConfig;
    stepConfigs: WizardStepConfig[];
    stepViews: import('svelte').Snippet[];
    stepReviews: import('svelte').Snippet[];
    onnext?: (step: number) => void;
    oncancel?: () => void;
    onstepchange?: (step: number) => void;
  }

  let { 
    isOpen, wizardConfig, stepConfigs, stepViews, stepReviews, 
    onnext, oncancel, onstepchange }: Props = $props();

  // From 0 to stepConfigs.length - 1  
  let activeStep: number = $state(1)
  let activeStepConfig: WizardStepConfig = stepConfigs[0];

  function cancel() {
    console.log("activeStepConfig:", JSON.stringify(activeStepConfig));
    if (oncancel != undefined) {
      oncancel?.();
    }
  }
  function nextStep() {
    console.log("stepConfigs:", JSON.stringify(stepConfigs));
    if (onnext != undefined) {
      onnext?.(activeStep);
    }
    activeStep = (activeStep < stepConfigs.length ? activeStep + 1 : activeStep);
    if (onstepchange != undefined) {
      onstepchange?.(activeStep - 1);
    }
  }
  function prevStep() {
    activeStep = (activeStep > 0 ? activeStep - 1 : activeStep);
    if (onstepchange != undefined) {
      onstepchange?.(activeStep - 1);
    }
  }

  onMount(() => {
    console.log("In Wizard2 onMount()");
    console.log("stepConfigs:", JSON.stringify(stepConfigs));
  });
</script>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{wizardConfig.title}</Dialog.Title>
      <Dialog.Description>
        <div class="flex justify-between items-center py-8">
          {#each stepConfigs as stepConfig, index}
            <div class="flex-1 flex gap-2 flex-col items-center justify-center text-center">
              <span class="font-medium text-muted-foreground" 
                  class:active={index === activeStep - 1}>
                {stepConfig.title}
              </span>
              <button class="font-medium border rounded-full text-muted-foreground p-2 px-4 hover:cursor-pointer"
                  class:active={index === activeStep - 1}
                  type="button">
                {index + 1}
              </button>
            </div>
          {/each}
        </div>

        <div>
          CURRENT {activeStep} - NEXT? {stepConfigs[0].nextEnabled} - ACTIVE NEXT? {activeStepConfig.nextEnabled}
        </div>

        {#if activeStep < stepConfigs.length}
          {#each stepViews as view, i}
            {#if i === activeStep - 1}
              {@render view()}<br/>
            {/if}
          {/each}
        {:else}
          <ul>
          {#each stepReviews as review, i}
            <li>
              <Collapsible.Root open={true}>
                <Collapsible.Trigger>{stepConfigs[i].title}</Collapsible.Trigger>
                <Collapsible.Content>{@render review()}</Collapsible.Content>
              </Collapsible.Root>
            </li>
          {/each}
          </ul>
        {/if}
        
      </Dialog.Description>
      <Dialog.Footer class="flex justify-between">
        <Button onclick={cancel} variant="outline">Cancel</Button>
        <Button onclick={prevStep} variant="outline" disabled={activeStep === 1}>Back</Button>
        <Button onclick={nextStep} disabled={!activeStepConfig.nextEnabled}>Next ({activeStepConfig.nextEnabled})</Button>
        <Button onclick={nextStep}>Next</Button>
      </Dialog.Footer>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>

<style>
  .active {
    @apply text-primary border-primary;
  }
</style>