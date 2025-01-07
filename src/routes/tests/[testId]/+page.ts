// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

import { getService } from "$lib/services/services.service";
import { getTestResult } from "$lib/services/tests.service";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, fetch, params }) => {
  console.log("In /tests/[id] PageLoad()");
  let parentData = await parent();

  console.log("In /tests/[id] PageLoad(), after parent load");
  const test = await getTestResult(params.testId);

  const data = {
    test: test,
    service: getService(test.serviceId),
  };

  return data;
};
