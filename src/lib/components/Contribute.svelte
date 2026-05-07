<script lang="ts">
	// M3.3 Contribute a provider.
	// Sources (verbatim where stated):
	// - acceptance gate: oauth-mux/docs/spec/provider-authoring-checklist-2026-04-26.md:278-289
	// - "ask" copy: oauth-mux/docs/spec/product-adoption-sprint-2026-04-28.md:140-144
	// - standards baseline references: oauth-mux/docs/spec/provider-authoring-checklist-2026-04-26.md:295-299

	const checklistUrl =
		'https://github.com/Jesssullivan/oauth-mux/blob/main/docs/spec/provider-authoring-checklist-2026-04-26.md';

	// Verbatim from oauth-mux/docs/spec/provider-authoring-checklist-2026-04-26.md:280-289.
	const acceptanceGate: string[] = [
		'config validate catches broken provider/account/profile/probe references.',
		'The provider can be selected through exec, env, and probe.',
		'Account-level failures dominate route state.',
		'Route-level failures do not poison unrelated capabilities.',
		'At least one positive and one negative probe path are covered by tests or redacted cassettes.',
		'The docs identify the official provider/OAuth/MCP source used for each auth, refresh, and probe decision.',
	];

	// Verbatim from oauth-mux/docs/spec/product-adoption-sprint-2026-04-28.md:141-143.
	const askPoints: string[] = [
		'link the provider-authoring checklist;',
		'ask for redacted cassettes, official docs links, and one positive/negative probe case.',
	];
</script>

<section id="contribute" class="container mx-auto px-6 py-16 lg:py-20">
	<div class="mx-auto max-w-4xl space-y-10">
		<header>
			<h2 class="h2 mb-4">Contribute a provider</h2>
			<p class="text-lg text-surface-700-300">
				New providers travel a schema-modeled to live-proven path. Start by declaring a JSON definition with redacted
				cassettes, then graduate to live-proven only after operator-scoped QA. The provider-authoring checklist is the
				canonical source of truth for what the harness will accept.
			</p>
			<p class="mt-3">
				<a class="anchor" href={checklistUrl} rel="noreferrer noopener" target="_blank">
					Read the provider-authoring checklist
				</a>
			</p>
		</header>

		<aside class="mt-8">
			<h3 class="h4 mb-3">Acceptance gate</h3>
			<p class="mb-3 text-surface-700-300">A new schema-only provider is acceptable when:</p>
			<ul class="list-disc space-y-2 pl-6">
				{#each acceptanceGate as line (line)}
					<li>{line}</li>
				{/each}
			</ul>
		</aside>

		<div>
			<h3 class="h4 mb-3">What we ask of contributors</h3>
			<ul class="list-disc space-y-2 pl-6">
				{#each askPoints as line (line)}
					<li>{line}</li>
				{/each}
			</ul>
		</div>

		<div>
			<h3 class="h4 mb-3">Standards baseline</h3>
			<p class="text-surface-700-300">
				Provider definitions are written against:
				<a
					class="anchor"
					href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1"
					rel="noreferrer noopener"
					target="_blank">OAuth 2.1 draft</a
				>, RFC 9700, RFC 8414, RFC 7591, RFC 9728, RFC 8707, RFC 9449, and the
				<a
					class="anchor"
					href="https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization"
					rel="noreferrer noopener"
					target="_blank">MCP authorization 2025-11-25</a
				> profile.
			</p>
		</div>
	</div>
</section>
