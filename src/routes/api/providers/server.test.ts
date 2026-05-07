// M5.1 (TIN-787) — unit test for the provider matrix JSON endpoint.
import { describe, expect, it } from 'vitest';
import { GET } from './+server';

describe('GET /api/providers', () => {
	it('returns the provider matrix as JSON with the expected shape', async () => {
		// SvelteKit RequestHandler signature accepts a request event; the handler
		// here doesn't read it, so we cast a minimal stub.
		const response = await GET({} as Parameters<typeof GET>[0]);
		expect(response).toBeInstanceOf(Response);
		expect(response.headers.get('content-type')).toBe('application/json');
		expect(response.headers.get('access-control-allow-origin')).toBe('*');

		const body = (await response.json()) as { generatedAt: string; providers: unknown[] };
		expect(typeof body.generatedAt).toBe('string');
		expect(Array.isArray(body.providers)).toBe(true);
		expect(body.providers.length).toBeGreaterThan(0);
		const first = body.providers[0] as { slug: string; name: string; status: string; flow: string };
		expect(typeof first.slug).toBe('string');
		expect(typeof first.name).toBe('string');
		expect(typeof first.status).toBe('string');
		expect(typeof first.flow).toBe('string');
	});
});
