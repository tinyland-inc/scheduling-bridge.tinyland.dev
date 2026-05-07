<script lang="ts">
	// M3.3 + TIN-801 phase 5 Security & Privacy posture.
	// Backends list moves into a Skeleton 4 Accordion so the page stays
	// scannable; readers expand the backend they care about. Other content
	// (four guarantees, redaction posture, daemon boundary callout) is
	// unchanged.
	//
	// Sources (verbatim where stated):
	// - four claims: oauth-mux/docs/spec/product-adoption-sprint-2026-04-28.md:127-131
	// - secret backends list: oauth-mux/docs/spec/provider-authoring-checklist-2026-04-26.md:82-90
	// - redaction posture paragraph: oauth-mux/docs/onboarding.md:139-141
	// - daemon boundary "Not Allowed Yet": oauth-mux/docs/daemon-boundary.md:1-23
	import { Accordion } from '@skeletonlabs/skeleton-svelte';

	const claims: string[] = [
		'no `.env` token dumping;',
		'no committed credential stores;',
		'no raw token output in discovery/health;',
		'explicit live probes only when they may spend calls.',
	];

	const backends: { name: string; blurb: string }[] = [
		{ name: 'env', blurb: 'read raw secret material from a process environment variable.' },
		{ name: 'file', blurb: 'read raw secret material from a file path on disk.' },
		{ name: 'keychain', blurb: 'read raw secret material from the OS keychain / secret service.' },
		{ name: 'sops', blurb: 'read raw secret material decrypted through a sops-managed file.' },
		{ name: 'age', blurb: 'read raw secret material decrypted through an age-managed file.' },
		{ name: 'command', blurb: 'read raw secret material from the stdout of an explicit command.' },
		{ name: 'stdin', blurb: 'read raw secret material from stdin at the moment of use.' },
	];

	const daemonNotAllowed: string[] = [
		'Background polling of live provider probes.',
		'Automatic subscription-spending checks.',
		'Silent token refresh for providers whose refresh semantics are owned by an upstream CLI.',
		'Any release gate that depends on a long-running daemon.',
	];

	// Default to all collapsed so the section reads as a compact summary.
	let openBackends = $state<string[]>([]);
</script>

<section id="security" class="container mx-auto px-6 py-16 lg:py-20">
	<div class="mx-auto max-w-4xl space-y-12">
		<header>
			<h2 class="h2 mb-4">Security &amp; Privacy</h2>
			<p class="text-lg text-surface-700-300">
				oauth-mux holds four hard guarantees around how secrets enter the harness, where they live, and what shows up in
				machine-readable output.
			</p>
		</header>

		<div>
			<h3 class="h4 mb-3">Four guarantees</h3>
			<ul class="list-disc space-y-2 pl-6">
				{#each claims as claim (claim)}
					<li>{claim}</li>
				{/each}
			</ul>
		</div>

		<div>
			<h3 class="h4 mb-3">Allowed secret backends</h3>
			<p class="mb-4 text-surface-700-300">
				The backend stores or returns raw secret material. It does not define provider logic. Any of the seven backends
				below is allowed; everything else is rejected at config validation time. Click a backend to expand its
				semantics.
			</p>
			<Accordion
				value={openBackends}
				onValueChange={(d) => {
					openBackends = d.value;
				}}
				multiple
				class="divide-y divide-surface-200-800 border-y border-surface-200-800"
			>
				{#each backends as b (b.name)}
					<Accordion.Item value={b.name}>
						<Accordion.ItemTrigger
							class="hover:bg-surface-100-900 flex w-full items-center justify-between px-2 py-3 text-left transition-colors"
						>
							<code class="font-mono text-sm font-semibold">{b.name}</code>
							<Accordion.ItemIndicator class="text-surface-500 text-sm">▾</Accordion.ItemIndicator>
						</Accordion.ItemTrigger>
						<Accordion.ItemContent class="px-2 pb-3 text-sm text-surface-700-300">
							{b.blurb}
						</Accordion.ItemContent>
					</Accordion.Item>
				{/each}
			</Accordion>
		</div>

		<div>
			<h3 class="h4 mb-3">Redaction posture</h3>
			<p class="text-surface-700-300">
				<code class="font-mono">discover --json</code> is intentionally redacted. It reports config path, state path, providers,
				account names, secret backend names, tags, profiles, and safe command templates. It does not include token material.
			</p>
		</div>

		<aside class="rounded-lg border border-warning-500/40 bg-warning-500/10 p-5">
			<h3 class="h4 mb-2">Daemon boundary</h3>
			<p class="text-surface-700-300">
				The daemon exists, but it is not a production dependency yet. The default production path remains explicit
				selection, explicit probe, env injection, and exec handoff. The following are explicitly <em>not allowed yet</em
				>:
			</p>
			<ul class="mt-3 list-disc space-y-1 pl-6 text-sm">
				{#each daemonNotAllowed as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</aside>
	</div>
</section>
