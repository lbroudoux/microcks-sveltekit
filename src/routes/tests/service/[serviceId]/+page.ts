// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

import type { PageLoad } from "./$types";
import { getService } from "$lib/services/services.service";
import { countTestResultsByServiceId, getTestResultsByServiceId } from "$lib/services/tests.service";

export const load: PageLoad = async ({ parent, fetch, params }) => {
  console.log("In /tests/service/[serviceId] PageLoad()");
  let parentData = await parent();

  console.log("In /tests/service/[serviceId] PageLoad(), after parent load");
  const serviceId = params.serviceId;

  const data = {
    service: getService(serviceId),
    testResultsCount: countTestResultsByServiceId(serviceId),
    testResults: await getTestResultsByServiceId(serviceId),
  };

  return data;
};
