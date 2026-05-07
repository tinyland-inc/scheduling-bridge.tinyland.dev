// M5.1 (TIN-787) — JSON API endpoint exposing the provider matrix.
// Prerendered at build time by adapter-static so the JSON lives at
// build/api/providers (served as /api/providers).
import { Schema } from 'effect';
import providers from '$lib/content/providers.json';
import { ProviderMatrix } from '$lib/content/providers.schema';
import type { RequestHandler } from './$types';

// Fail-fast at build time on malformed provider data.
const matrix = Schema.decodeUnknownSync(ProviderMatrix)(providers);

export const prerender = true;

export const GET: RequestHandler = () => {
	return new Response(JSON.stringify(matrix), {
		headers: {
			'content-type': 'application/json',
			'access-control-allow-origin': '*',
			'cache-control': 'public, max-age=3600',
		},
	});
};
