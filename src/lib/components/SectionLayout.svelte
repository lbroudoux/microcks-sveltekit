<script lang="ts">
  import clsx from "clsx";

  export let style: string = "";
</script>

<section class={clsx("w-full h-full p-8", style)}>
  <slot />
</section>
