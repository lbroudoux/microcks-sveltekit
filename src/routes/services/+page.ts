// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

import type { PageLoad } from "./$types";
import { countServices, getServices, getServicesLabels } from "$lib/services/services.service";

export const load: PageLoad = async ({ parent, fetch, params }) => {
  console.log("In /services PageLoad()");
  let parentData = await parent();

  console.log("In /services PageLoad(), after parent load");
  const data = {
    servicesCount: countServices(),
    servicesLabels: getServicesLabels(),
    services: await getServices(1, 5),
  };

  return data;
};
