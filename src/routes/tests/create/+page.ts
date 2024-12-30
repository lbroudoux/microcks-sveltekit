// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, fetch, params }) => {
  console.log("In /tests/create PageLoad()");
  let parentData = await parent();

  console.log("In /tests/create PageLoad(), after parent load");
  
  const data = {
  };

  return data;
};
