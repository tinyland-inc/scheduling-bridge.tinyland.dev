<script lang="ts">
	// M3.1 Fallback Algebra.
	// Sources (verbatim where stated):
	// - CredentialLiveness + Availability: oauth-mux/src/types.zig:152-215
	// - DegradedReason + DeadReason: oauth-mux/src/types.zig:224-240
	// - MuxDecision + fromHttpStatus: oauth-mux/src/types.zig:245-261
	// - Routing semantics: oauth-mux/docs/spec/provider-authoring-checklist-2026-04-26.md:223-231
	import CodeBlock from './CodeBlock.svelte';

	let {
		livenessHtml,
		deadDegradedHtml,
		muxDecisionHtml,
	}: {
		livenessHtml: string;
		deadDegradedHtml: string;
		muxDecisionHtml: string;
	} = $props();
</script>

<section id="fallback" class="container mx-auto px-6 py-16 lg:py-20">
	<div class="mx-auto max-w-4xl">
		<h2 class="h2 mb-4">Fallback algebra</h2>
		<p class="mb-6 text-lg text-surface-700-300">
			oauth-mux models credential health as a typed three-layer union — authentication, operability, and availability —
			so the pipeline can pick the right next move instead of guessing at an opaque 401 or 429.
		</p>

		<h3 class="h3 mt-8">CredentialLiveness &amp; Availability</h3>
		<CodeBlock html={livenessHtml} lang="zig" caption="oauth-mux/src/types.zig:152-215" />

		<h3 class="h3 mt-10">DegradedReason &amp; DeadReason</h3>
		<CodeBlock html={deadDegradedHtml} lang="zig" caption="oauth-mux/src/types.zig:224-240" />

		<h3 class="h3 mt-10">MuxDecision</h3>
		<p class="mb-4 text-surface-700-300">
			The <code>fromHttpStatus</code> switch is the canonical routing-semantics table — HTTP status maps to a single decision,
			no extra prose required.
		</p>
		<CodeBlock html={muxDecisionHtml} lang="zig" caption="oauth-mux/src/types.zig:245-261" />
	</div>
</section>
