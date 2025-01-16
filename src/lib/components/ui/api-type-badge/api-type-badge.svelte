<script lang="ts">
  import { apiTypes } from "$lib/utils/constants";
  import type { ApiType } from "$lib/utils/types";

  interface Props {
    type: string;
  }

  let { type }: Props = $props();

  let apiType: ApiType = apiTypes.find(
    (t) => t.name.toUpperCase() === type.toUpperCase()
  ) || {
    name: "UNKNOWN",
    color: "gray-500",
  };
</script>

<span class={`p-2 rounded font-medium uppercase text-white`} style={`background-color: ${ apiType.color };`}>
  { apiType.name }
</span>
