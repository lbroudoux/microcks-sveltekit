<script lang="ts">
  import type { ServiceType } from "$lib/models/service.model";

  type ApiType = {
    name: string;
    color: string;
  };
  const apiTypes: ApiType[] = [
    { name: "REST", color: "#3F9C35" },
    { name: "GRAPHQL", color: "#E10198" },
    { name: "GRPC", color: "#379C9C" },
    { name: "SOAP_HTTP", color: "#139CF4" },
    { name: "EVENT", color: "#ec7a08" },
    { name: "GENERIC", color: "#9C27B0" },
    { name: "GENERIC_EVENT", color: "#9C27B0" },
  ];

  interface Props {
    type: ServiceType;
  }

  let { type }: Props = $props();
  let apiType: ApiType = $derived.by(() => {
    return (
      apiTypes.find((t) => type === t.name) || {
        name: "UNKNOWN",
        color: "gray-500",
      }
    );
  });
</script>

<span
  class={`p-2 rounded font-medium uppercase text-white`}
  style={`background-color: ${apiType.color};`}
>
  {apiType.name}
</span>
