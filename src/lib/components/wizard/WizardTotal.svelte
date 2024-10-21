<script lang="ts">
  import { writable, type Writable } from "svelte/store";

  import Label from "@/components/ui/label/label.svelte";
  import Input from "@/components/ui/input/input.svelte";
  import Textarea from "@/components/ui/textarea/textarea.svelte";
  import Checkbox from "@/components/ui/checkbox/checkbox.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import { Button, buttonVariants } from "$lib/components/ui/button/index";

  import type { WizardConfig } from "@/utils/interfaces";

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

  function nextStep() {
    activeStep.update((n) => (n < numSteps - 1 ? n + 1 : n));
  }

  function prevStep() {
    activeStep.update((n) => (n > 0 ? n - 1 : n));
  }

  function goToStep(index: number) {
    activeStep.set(index);
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
            {#if input.type === "text" || input.type === "textarea"}
              <div
                class="w-full flex flex-col items-center justify-center gap-2 py-2"
              >
                <Label
                  for={input.id || input.name}
                  class="text-left w-full inline-flex gap-1"
                >
                  {#if input.required}
                    <span class="text-red-600 text-md">*</span>{/if}
                  {input.label}
                </Label>
                {#if input.type === "text"}
                  <Input
                    type="text"
                    id={input.id || input.name}
                    name={input.name}
                    placeholder={input.placeholder}
                  />
                {:else}
                  <Textarea
                    id={input.id || input.name}
                    name={input.name}
                    placeholder={input.placeholder}
                  />
                {/if}
                {#if input.description}
                  <p class="text-sm text-muted-foreground">
                    {input.description}
                  </p>
                {/if}
              </div>
            {:else if input.type === "checkbox"}
              {#if input.description}
                <p class="text-sm">{input.description}</p>
              {/if}
              <div
                class="w-full flex flex-row items-center justify-start gap-2"
              >
                <Checkbox id={input.id || input.name} name={input.name} />
                <Label
                  for={input.id || input.name}
                  class="text-left inline-flex gap-1"
                >
                  {input.label}
                </Label>
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    {/each}

    <Dialog.Footer class="flex justify-between">
      <Button on:click={prevStep} disabled={$activeStep === 0}>Previous</Button>
      <Button on:click={nextStep} disabled={$activeStep === numSteps - 1}
        >Next</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<style>
  .active {
    @apply text-primary border-primary;
  }
</style>
