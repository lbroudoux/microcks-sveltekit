<script lang="ts">
  // Implementation example of the component => src/routes/test/+page.svelte

  import type { SectionHeading } from "$lib/utils/interfaces";

  export let sectionHeading: SectionHeading;
</script>

<section class="w-11/12 flex flex-row items-start justify-between gap-4">
  <div class="flex flex-col justify-start items-start gap-2 w-3/5">
    <h1 class="text-xl">
      {sectionHeading.title}
    </h1>
    <p class="text-muted-foreground text-sm">
      {sectionHeading.description}
    </p>
  </div>
  <slot name="headingActions" />
</section>
