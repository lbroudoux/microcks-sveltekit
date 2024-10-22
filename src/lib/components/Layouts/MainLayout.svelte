<script lang="ts">
  import clsx from "clsx";

  export let classes: string = "";
</script>

<main class={clsx("w-full h-full ml-16 p-8", classes)}>
  <slot />
</main>
