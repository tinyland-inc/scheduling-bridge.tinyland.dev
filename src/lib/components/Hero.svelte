<script lang="ts">
	// M3.1 + TIN-801 Hero. Composition follows the launch-bar acceptance:
	// name, literal value prop, install command, ONE high-signal liveness viz
	// (LivenessLadder), and TWO clear CTAs. Raw probe JSON moves into a
	// disclosure so it stays accessible without dominating the first viewport.
	//
	// Sources:
	// - current four-route Codex truth: oauth-mux/docs/live-provider-qa.md:104-110
	// - public claim policy: oauth-mux/docs/spec/paid-cohort-soak-claim-policy-2026-05-03.md
	import CodeBlock from './CodeBlock.svelte';
	import LivenessLadder from './LivenessLadder.svelte';

	const REPO_URL = 'https://github.com/Jesssullivan/oauth-mux';

	let { installHtml }: { installHtml: string } = $props();
</script>

<section id="hero" class="container mx-auto px-6 py-16 lg:py-24">
	<header class="mx-auto max-w-3xl">
		<p class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-500">typed OAuth fallback</p>
		<h1 class="h1 text-5xl font-bold tracking-tight lg:text-7xl">oauth-mux</h1>
		<p class="mt-4 text-xl text-surface-700-300 lg:text-2xl">
			Keep AI harness sessions afloat across multiple accounts with typed liveness, redacted discovery, and explicit
			fallback.
		</p>
		<p class="mt-4 text-sm leading-relaxed text-surface-600-400">
			Codex route selection, broker-owned sessions, and controlled fallback drills are proven for the current paid
			cohort. Provider-originated in-session quota fallback is still an explicit proof lane. The background daemon is
			not a production dependency.
		</p>

		<!-- Primary CTA scrolls to the proof flow; secondary actions stay local. -->
		<div class="mt-8 flex flex-wrap gap-3">
			<a href="#stay-afloat" class="btn preset-filled-primary-500 px-5 py-2.5 text-sm font-semibold tracking-tight">
				Prove stay-afloat
			</a>
			<a href="#install" class="btn preset-tonal-surface px-5 py-2.5 text-sm font-semibold tracking-tight"> Install </a>
			<a
				href={REPO_URL}
				rel="noreferrer noopener"
				target="_blank"
				class="btn preset-tonal-surface px-5 py-2.5 text-sm font-semibold tracking-tight"
			>
				View on GitHub
			</a>
		</div>
	</header>

	<!-- Single high-signal liveness viz replaces the previous 3-up JSON dump. -->
	<div class="mx-auto mt-12 max-w-4xl">
		<LivenessLadder />
	</div>

	<!-- Inline install snippet right under the viz so the eye lands on the
	     copyable command before scrolling. -->
	<div class="mx-auto mt-10 max-w-3xl">
		<h2 class="h3 mb-2">Install and probe</h2>
		<CodeBlock html={installHtml} lang="bash" />
	</div>
</section>
