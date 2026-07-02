import { expect, test } from '@playwright/test';

// TIN-802 regression guard (inherited from the scaffold heritage):
//   1. No document-level horizontal overflow at the four canonical
//      breakpoints (wide tables/code blocks must scroll in their own
//      container, never the document).
//   2. Every same-page hash link resolves to an actual element on the page
//      that renders it.

const breakpoints = [
	{ label: 'mobile-small', width: 390, height: 1200 },
	{ label: 'mobile-large', width: 430, height: 1200 },
	{ label: 'tablet', width: 768, height: 1200 },
	{ label: 'desktop', width: 1440, height: 1200 },
];

for (const bp of breakpoints) {
	test(`home page has no document overflow at ${bp.label} (${bp.width}px)`, async ({ page }) => {
		await page.setViewportSize({ width: bp.width, height: bp.height });
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const { scrollWidth, innerWidth } = await page.evaluate(() => ({
			scrollWidth: document.documentElement.scrollWidth,
			innerWidth: window.innerWidth,
		}));
		// Tolerate up to 1px subpixel rounding; anything beyond means real overflow.
		expect(scrollWidth, `${bp.label} document overflow`).toBeLessThanOrEqual(innerWidth + 1);
	});
}

test('home-route same-page hash links all resolve to an element', async ({ page }) => {
	await page.goto('/');
	await page.waitForLoadState('networkidle');
	const broken = await page.evaluate(() => {
		const hashes = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
			.map((a) => a.getAttribute('href') ?? '')
			.filter((h) => h.startsWith('/#') || h.startsWith('#'))
			.map((h) => (h.startsWith('/#') ? h.slice(1) : h));
		const unique = Array.from(new Set(hashes));
		return unique.filter((h) => h.length > 1 && !document.querySelector(h));
	});
	expect(broken, 'home-route hash targets without matching element').toEqual([]);
});

test('non-home routes have no dead same-page hash links', async ({ page }) => {
	// Same-page hashes (#foo) must resolve to an element on that page. Cross-page
	// hashes use absolute form (/#foo) and are validated separately at build time
	// by SvelteKit's prerender handleMissingId check.
	for (const route of ['/style-guide/?guide=1']) {
		await page.goto(route);
		await page.waitForLoadState('networkidle');
		const broken = await page.evaluate(() => {
			return Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
				.map((a) => a.getAttribute('href') ?? '')
				.filter((h) => h.startsWith('#') && h.length > 1)
				.filter((h) => !document.querySelector(h));
		});
		expect(broken, `${route} same-page hash targets without matching element`).toEqual([]);
	}
});
