<script lang="ts">
	// M5.1 (TIN-787) + TIN-801 phase 4 — agent-snippet page.
	// Renders the "drop this into your AI assistant" snippet as copy-friendly
	// markdown. Copy feedback now goes through Skeleton 4 Toast (Zag.js
	// underneath) instead of inline button-text mutation, so the affordance
	// is consistent with the rest of the design system.
	import { createToaster, Toast, Portal } from '@skeletonlabs/skeleton-svelte';

	const snippet = `oauth-mux is a typed OAuth multiplexer for multi-account AI harnesses.
Use it to inspect accounts, route around exhausted credentials, and keep sessions afloat through explicit foreground checks.

Live-proven today: Codex route selection, broker-owned sessions, and controlled fallback drills.
Current Codex Max cohort: max-1 selected, max-4 spare fallback, max-2/max-3 quota-exhausted for codex-max.
Capability-modeled / in proof lanes: Claude, GitHub, Linear, Vercel, Figma, FlakeHub, MCP.
Not claimed: provider-originated in-session quota fallback, unmanaged TUI hot-swap, production daemon, or universal provider support.

Install: npm install -g oauth-mux
First run:
  oauth-mux init --codex-max
  oauth-mux doctor
  oauth-mux accounts list --provider codex --json

Stay-afloat proof:
  oauth-mux route explain --profile codex-max --capability codex-max --json
  oauth-mux codex broker-session-plan --profile codex-max --capability codex-max --json
  oauth-mux stay-afloat --once --profile codex-max --capability codex-max --json

Agent rules:
  Do not read secret.path files.
  Do not print token-shaped values.
  Do not infer codex-max availability from Spark/mini/credit dashboard text.
  Do not pass --confirm-spend or run live probes unless the user explicitly authorizes spend.

Provider matrix (machine-readable): https://scheduling-bridge.tinyland.dev/api/providers
Source: https://github.com/Jesssullivan/oauth-mux
Site:   https://scheduling-bridge.tinyland.dev
`;

	const toaster = createToaster({ placement: 'bottom-end', overlap: true });

	async function copySnippet() {
		try {
			await navigator.clipboard.writeText(snippet);
			toaster.create({
				title: 'Copied to clipboard',
				description: 'Snippet ready to paste into your AI coding assistant.',
				type: 'success',
				duration: 3000,
			});
		} catch {
			toaster.create({
				title: 'Copy failed',
				description: 'Browser blocked clipboard access — select the text manually.',
				type: 'error',
				duration: 5000,
			});
		}
	}
</script>

<svelte:head>
	<title>Agent snippet — oauth-mux</title>
	<meta
		name="description"
		content="Copy-friendly snippet to paste into Claude, Cursor, Codex, or ChatGPT so it knows how to use oauth-mux."
	/>
</svelte:head>

<main>
	<section class="container mx-auto px-6 py-12 lg:py-16">
		<div class="mx-auto max-w-4xl space-y-8">
			<header>
				<h1 class="h1 mb-4">Agent snippet</h1>
				<p class="text-lg text-surface-700-300">
					Paste this into your AI coding assistant (Claude/Cursor/Codex/ChatGPT) so it knows how to use oauth-mux when
					running commands on your behalf.
				</p>
			</header>

			<div class="space-y-3">
				<button
					type="button"
					class="btn preset-filled-primary-500 px-5 py-2.5 text-sm font-semibold tracking-tight"
					onclick={copySnippet}
				>
					Copy to clipboard
				</button>
				<pre class="p-4 text-sm leading-relaxed"><code class="font-mono">{snippet}</code></pre>
			</div>

			<aside class="border-l-2 border-primary-500/40 pl-6">
				<p class="text-sm text-surface-700-300">
					The provider matrix is also available at
					<a class="anchor font-mono" href="/api/providers">https://scheduling-bridge.tinyland.dev/api/providers</a>
					as machine-readable JSON.
				</p>
			</aside>
		</div>
	</section>
</main>

<Portal>
	<Toast.Group {toaster} />
</Portal>
