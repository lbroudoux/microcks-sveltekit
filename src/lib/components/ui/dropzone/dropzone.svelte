<script lang="ts">
  import Files from "lucide-svelte/icons/files";

  export let fileLoaded: any = null;

  function loadFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        fileLoaded = file;
      }
    };
    input.click();
  }
</script>

<p class="text-2xl font-bold text-center">
  File loaded:
  {#if fileLoaded}
    {fileLoaded.name}
  {:else}
    None
  {/if}
</p>

<button
  class="w-1/3 text-muted-foreground hover:text-foreground p-8 border-dashed rounded border-muted-foreground/25 border-2 hover:border-muted-foreground/50 bg-muted flex flex-col items-center justify-center gap-2 my-4 hover:cursor-pointer transition-all"
  on:click={loadFile}
>
  <Files />
  <span class="text-md">Drag Files to Upload or Click Here</span>
</button>
