<script lang="ts">
  import { onMount } from "svelte";
  import * as Dialog from "$lib/components/ui/dialog";
  import WizardStep from "./wizard-step.svelte";

  interface Props {
    isOpen: boolean;
    children?: import('svelte').Snippet;
  }

  let { isOpen, children }: Props = $props();

  onMount(() => {
    console.log("In Wizard onMount()");
    console.log("children:", JSON.stringify(children));
  });
</script>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Wizard Title</Dialog.Title>
      <Dialog.Description>
        Wizard Description <br/>
        {@render children?.()}
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>