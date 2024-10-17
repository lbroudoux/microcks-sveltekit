import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  console.log("In handleFetch")
	if (request.url.startsWith('/api')) {
		// clone the original request, but change the URL
		console.log("This is an API call...")
	}

	return fetch(request);
};