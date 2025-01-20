<script lang="ts">
  import { onMount } from 'svelte';
  import { CircleX } from 'lucide-svelte';

  import * as Dialog from "$lib/components/ui/dialog";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  

  interface Props {
    isOpen: boolean;
    resourceName: string;
    resourceType: string;
    labels: Record<string, string>;
    onsave: (labels: Record<string, string>) => void;
  }

  let { isOpen, resourceName, resourceType, labels, onsave }: Props = $props();

  let newLabels: Record<string, string> = $state(labels);
  let labelKV: string = $state('');

  onMount(() => {
    // Make sure we have a labels object
    if (labels == undefined || labels == null) {
      newLabels = {};
    }
	});

  function addLabel():void {
    if (labelKV.indexOf('=') != -1) {
      const kv: string[] = labelKV.split('=');
      if (kv.length == 2) {
        newLabels[kv[0]] = kv[1];
      }
    }
    labelKV = '';
  }
  function removeLabel(label: string) {
    delete newLabels[label];
    labelKV = '';
  }

  function saveLabels(): void {
    onsave(newLabels);
    isOpen = false;
  }
  function cancel(): void {
    console.log("cancel() called");
    isOpen = false;
  }
</script>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Content>
    <Dialog.Header>Edit Labels</Dialog.Header>
    <Dialog.Description>
      <p>
        Labels help you organize and select resources. Adding labels below will let you query for objects that have similar, overlapping or dissimilar labels.
      </p>
    </Dialog.Description>

    <form>
      <label for="labelKV">Labels for { resourceType } { resourceName }</label>
      <div>
        {#each Object.keys(newLabels) as label}
          <Badge variant="secondary">{label}={ newLabels[label] } <CircleX size={12} class="m-2" onclick={() => (removeLabel(label)) }/></Badge>
        {/each}
        <input type="text" id="labelKV" bind:value="{labelKV}" onblur={addLabel} placeholder="domain=frontend" spellcheck="false" />
      </div>
    </form>

    <Dialog.Footer class="flex justify-between">
      <Button onclick={cancel} variant="outline">Cancel</Button>
      <Button onclick={saveLabels}>Save</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
