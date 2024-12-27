<script lang="ts">
  import clsx from "clsx";

  export let classes: string = "";
</script>

<div class={clsx("w-full h-full", classes)}>
  <slot />
</div>
