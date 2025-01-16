<script lang="ts">
  import { apiTypesIcons } from "$lib/utils/constants";
  import type { ApiTypeIcon } from "$lib/utils/types";

  interface Props {
    type: string;
  }

  let { type }: Props = $props();

  let apiTypeIcon: ApiTypeIcon = apiTypesIcons.find(
    (t) => t.name.toUpperCase() === type.toUpperCase()
  ) || {
    name: "UNKNOWN",
    icon: "generic-icon-sm",
  };
</script>

<span class="list-view-pf-icon-sm { apiTypeIcon.icon }"></span>

<style>
.rest-icon-sm {
  border: 3px solid #89bf04 !important;
}
.soap-icon-sm {
  border: 3px solid #39a5dc !important;
}
.event-icon-sm {
  border: 3px solid #ec7a08 !important;
}
.grpc-icon-sm {
  border: 3px solid #379c9c !important;
}
.graph-icon-sm {
  border: 3px solid #e10098 !important;
}
.generic-icon-sm {
  border: 3px solid #9c27b0 !important;
}

.list-view-pf-icon-sm {
  display: inline-block;
  border-radius: 50%;
  font-size: 1.4em;
  height: 30px;
  line-height: 30px;
  width: 30px;
}

</style>
