<script lang="ts">
  import Label from "../label/label.svelte";
  import Input from "../input/input.svelte";
  import Textarea from "../textarea/textarea.svelte";
  import Checkbox from "../checkbox/checkbox.svelte";

  import type { WizardStepInput } from "$lib/utils/interfaces";

  export let input: WizardStepInput;
</script>

{#if input.type === "text" || input.type === "textarea"}
  <div class="w-full flex flex-col items-start justify-center gap-2 py-2">
    <Label
      for={input.id || input.name}
      class="text-left w-full inline-flex gap-1 text-md"
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
    <p class="text-md">{input.description}</p>
  {/if}
  <div class="w-full flex flex-row items-center justify-start gap-2">
    <Checkbox id={input.id || input.name} name={input.name} />
    <Label for={input.id || input.name} class="text-left inline-flex gap-1">
      {input.label}
    </Label>
  </div>
{/if}
