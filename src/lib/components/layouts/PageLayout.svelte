<script lang="ts">
  import clsx from "clsx";

  interface Props {
    classes?: string;
    children?: import('svelte').Snippet;
  }

  let { classes = "", children }: Props = $props();
</script>

<div class={clsx("w-full h-full", classes)}>
  {@render children?.()}
</div>
