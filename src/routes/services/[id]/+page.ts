// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

import type { PageLoad } from './$types';
import { getService } from '@/services/services.service';

export const load: PageLoad = async ({ parent, params }) => {
  console.log("In /services/[id] PageLoad()");
  let parentData = await parent();

  console.log("In /services[id] PageLoad(), after parent load");
  const data = {
    service: await getService(params.id)
  }

  return data;
}