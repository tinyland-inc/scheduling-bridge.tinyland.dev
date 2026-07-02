// Build-time Shiki highlighter for prerendered code samples; no client
// runtime usage. House constraint: all syntax highlighting is pre-rendered
// at build time (currently unused — kept for future prerendered code
// surfaces).

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
