import type { SvelteComponent } from "svelte";
import { Cloud, Plug, Hexagon, MoveHorizontal, Cog } from "lucide-svelte";

export function getIconServiceType(type: string) {
  switch (type) {
    case "REST":
      return Cloud as typeof SvelteComponent;
    case "GRAPHQL":
      return Hexagon as typeof SvelteComponent;
    case "GRPC":
      return MoveHorizontal as typeof SvelteComponent;
    case "SOAP":
      return Cog as typeof SvelteComponent;
    default:
      return Plug as typeof SvelteComponent;
  }
}
