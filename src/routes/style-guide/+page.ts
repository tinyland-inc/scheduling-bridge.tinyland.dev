/**
 * Style guide route — prerendered so adapter-static includes it. Gating
 * to `?guide=1` happens in the page component (the build still emits the
 * static HTML; the gated UI just hides content when the param is absent).
 *
 * `trailingSlash: 'always'` makes adapter-static emit
 * `build/style-guide/index.html` (matching the M2.5 acceptance) instead
 * of the default `build/style-guide.html`.
 */
export const prerender = true;
export const trailingSlash = 'always';
