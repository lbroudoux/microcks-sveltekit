<script lang="ts">
  import { onMount } from "svelte";
  import type { ServiceType } from "$lib/models/service.model";

  type ApiTypeIcon = {
    name: string;
    iconClass: string;
  };
  const apiTypesIcons: ApiTypeIcon[] = [
    { name: "REST", iconClass: "rest-icon-sm" },
    { name: "GRAPHQL", iconClass: "graph-icon-sm" },
    { name: "GRPC", iconClass: "grpc-icon-sm" },
    { name: "SOAP_HTTP", iconClass: "soap-icon-sm" },
    { name: "EVENT", iconClass: "event-icon-sm" },
    { name: "GENERIC", iconClass: "generic-icon-sm" },
    { name: "GENERIC_EVENT", iconClass: "generic-icon-sm" },
  ]

  interface Props {
    type: ServiceType;
  }

  let { type }: Props = $props();

  let apiTypeIcon: ApiTypeIcon = $derived.by(() => {
		return apiTypesIcons.find(
      (t) => type === t.name) || {
        name: "UNKNOWN",
        iconClass: "generic-icon-sm",
      };
	});
</script>

<span class="icon-sm { apiTypeIcon.iconClass }"></span>

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

.icon-sm {
  display: inline-block;
  border-radius: 50%;
  font-size: 1.4em;
  height: 30px;
  line-height: 30px;
  width: 30px;
}
</style>
