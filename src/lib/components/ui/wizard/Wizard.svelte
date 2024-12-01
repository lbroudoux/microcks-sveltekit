<script lang="ts">
  import { writable, type Writable } from "svelte/store";

  import WizardStep from "$lib/components/ui/wizard/WizardStep.svelte";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button, buttonVariants } from "$lib/components/ui/button";

  import type { WizardConfig, WizardFormValues } from "$lib/utils/interfaces";

  export let wizard: WizardConfig = {
    triggerValue: "Create",
    submitValue: "Create",
    title: "",
    description: "",
    steps: [
      {
        icon: undefined,
        title: "",
        stepName: "",
        description: "",
        inputs: [
          {
            label: "",
            name: "",
            id: "",
            description: "",
            placeholder: "",
            type: "text",
            required: false,
          },
        ],
      },
    ],
  };

  const numSteps: number = wizard.steps.length;
  let activeStep: Writable<number> = writable(0);
  let formValues: Writable<WizardFormValues> = writable({});

  function updateInputValue(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;

    if (target.type === "checkbox") {
      const checked = (target as HTMLInputElement).checked;
      formValues.update((currentValues) => ({
        ...currentValues,
        [target.name]: checked,
      }));
    } else {
      const value = target.value;
      formValues.update((currentValues) => ({
        ...currentValues,
        [target.name]: value,
      }));
    }
  }

  function nextStep() {
    activeStep.update((n) => (n < numSteps - 1 ? n + 1 : n));
  }

  function prevStep() {
    activeStep.update((n) => (n > 0 ? n - 1 : n));
  }

  function goToStep(index: number) {
    activeStep.set(index);
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    formValues.subscribe((values) => {
      console.log("Form values:", values);
    });
  }
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    {wizard.triggerValue}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header class="border-b w-full py-4">
      <Dialog.Title class="font-semibold">{wizard.title}</Dialog.Title>
      {#if wizard.description}
        <Dialog.Description>{wizard.description}</Dialog.Description>
      {/if}
    </Dialog.Header>

    <form on:submit={handleSubmit}>
      <div class="flex justify-between items-center py-8">
        {#each wizard.steps as step, index}
          <div
            class="flex-1 flex gap-2 flex-col items-center justify-center text-center"
          >
            <span
              class="font-medium text-muted-foreground"
              class:active={index === $activeStep}
            >
              {step.stepName || step.title}
            </span>
            <button
              class="font-medium border rounded-full text-muted-foreground p-2 px-4 hover:cursor-pointer"
              class:active={index === $activeStep}
              on:click={() => goToStep(index)}
              type="button"
            >
              {index + 1}
            </button>
          </div>
        {/each}
      </div>

      {#each wizard.steps as step, index}
        {#if index === $activeStep}
          <WizardStep {step} />
        {/if}
      {/each}

      <Dialog.Footer class="flex justify-between">
        <Button on:click={prevStep} disabled={$activeStep === 0}
          >Previous</Button
        >
        <Button on:click={nextStep} disabled={$activeStep === numSteps - 1}
          >Next</Button
        >
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>

<style>
  .active {
    @apply text-primary border-primary;
  }
</style>
