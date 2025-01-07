// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

import type { PageLoad } from "./$types";
import { getServicesMap } from "$lib/services/services.service";
import { getAggregatedTestConformanceMetrics, getInvocationsStatsTrend, getLatestTestsTrend, getTopInvocations } from "$lib/services/metrics.service";

export const load: PageLoad = async ({ parent, fetch, params }) => {
  console.log("In / PageLoad()");
  let parentData = await parent();

  console.log("In / PageLoad(), after parent load");
  const data = {
    servicesMap: getServicesMap(),
    topInvocations: getTopInvocations(new Date()),
    invocationsTrend: getInvocationsStatsTrend(20),
    aggregatedTestConformences: getAggregatedTestConformanceMetrics(),
    latestTestTrend: getLatestTestsTrend(7),
  };

  return data;
};
