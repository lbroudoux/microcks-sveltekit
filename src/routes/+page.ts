// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

import type { PageLoad } from './$types';
import { getServices } from '@/services/services.service';

export const load: PageLoad = async ({ parent, fetch, params }) => {
  console.log("In PageLoad()");
  let parentData = await parent();

  console.log("In PageLoad(), after parent load");
  const data = {
    services: await getServices()
  }

  return data;
}