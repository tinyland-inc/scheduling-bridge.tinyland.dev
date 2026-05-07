// Build-time Shiki highlighter. Used by `+page.server.ts` during prerender;
// no client runtime usage. See docs/spec/omux-website-bootstrap-2026-04-29.md
// § Information Architecture (M3) for the constraint that all syntax
// highlighting is pre-rendered at build time.

import { createHighlighter, type Highlighter } from 'shiki';

let highlighter: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
	if (!highlighter) {
		highlighter = createHighlighter({
			themes: ['vitesse-dark', 'light-plus'],
			langs: ['ts', 'tsx', 'svelte', 'bash', 'json', 'zig'],
		});
	}
	return highlighter;
}

export async function highlight(code: string, lang: string): Promise<string> {
	const hi = await getHighlighter();
	return hi.codeToHtml(code, {
		lang,
		themes: { light: 'light-plus', dark: 'vitesse-dark' },
		defaultColor: false,
	});
}
