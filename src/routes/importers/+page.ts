export const prerender = false;

import type { PageLoad } from "./$types";
import { getImportJobs } from "$lib/services/importers.service";

export const load: PageLoad = async ({ parent, fetch, params }) => {
  console.log("In /importers PageLoad()");

  let parentData = await parent();

  console.log("In /importers PageLoad(), after parent load");

  const data = {
    services: await getImportJobs(),
  };

  return data;
};
