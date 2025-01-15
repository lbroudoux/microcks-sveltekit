<script lang="ts">
  import type { SectionHeading } from "$lib/utils/interfaces";

  interface Props {
    sectionHeading: SectionHeading;
    headingActions?: import('svelte').Snippet;
  }

  let { sectionHeading, headingActions }: Props = $props();
</script>

<section class="w-full flex flex-row items-start justify-between gap-4 py-4">
  <div class="flex flex-col justify-start items-start space-y-1 w-3/5">
    <h1 class="text-xl">
      {sectionHeading.title}
    </h1>
    <p class="text-muted-foreground text-sm">
      {sectionHeading.description}
    </p>
  </div>
  {@render headingActions?.()}
</section>
