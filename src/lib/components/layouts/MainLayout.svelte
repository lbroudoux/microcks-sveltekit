<script lang="ts">
  import clsx from "clsx";

  interface Props {
    classes?: string;
    children?: import("svelte").Snippet;
  }

  let { classes = "", children }: Props = $props();
</script>

<main class={clsx("h-full ml-16 p-8", classes)}>
  {@render children?.()}
</main>
