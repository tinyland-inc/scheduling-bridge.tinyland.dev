<script lang="ts">
	// Top-of-page stay-afloat truth surface.
	// Sources:
	// - no-spend/runtime/account inventory: oauth-mux/docs/onboarding.md:72-109
	// - foreground stay-afloat contract: oauth-mux/docs/onboarding.md:214-270
	// - permission broker boundary: oauth-mux/docs/spec/stay-afloat-permission-broker-contract-2026-05-01.md:23-44
	// - paid proof cohort / claim policy: oauth-mux/docs/spec/paid-multi-account-proof-cohort-2026-05-01.md:186-239
	import { Activity, ShieldCheck, UserPlus, Video } from '@lucide/svelte';
	import CodeBlock from './CodeBlock.svelte';

	let {
		stayAfloatProofHtml,
		enrollmentHandoffHtml,
		reauthHandoffHtml,
		videoDemoHtml,
	}: {
		stayAfloatProofHtml: string;
		enrollmentHandoffHtml: string;
		reauthHandoffHtml: string;
		videoDemoHtml: string;
	} = $props();

	const truths: { label: string; text: string }[] = [
		{
			label: 'Works now',
			text: 'Foreground stay-afloat reads local runtime readiness plus recorded liveness, then reports the selectable route or the exact handoff needed.',
		},
		{
			label: 'Safe by default',
			text: 'Without explicit execution or spend confirmation, it does not open browser auth, rewrite provider stores, or run live provider probes.',
		},
		{
			label: 'Not claimed yet',
			text: 'The background/socket daemon is not a production dependency. Service wrappers remain optional shells around the foreground contract.',
		},
	];
</script>

<section id="stay-afloat" class="border-surface-200-800 bg-surface-100-900 border-y px-6 py-14 lg:py-20">
	<div class="container mx-auto">
		<div class="mx-auto max-w-5xl space-y-10">
			<header class="max-w-3xl">
				<p class="text-primary-600-400 mb-3 font-mono text-xs uppercase tracking-[0.18em]">stay-afloat truth</p>
				<h2 class="h2 mb-4">Prove the mux works in this session.</h2>
				<p class="text-lg text-surface-700-300">
					The first product story is not a daemon. It is a visible foreground loop: inspect configured accounts, prove
					runtime access, explain route health, select a usable account, and hand off reauth only when the user owns the
					next step.
				</p>
			</header>

			<div class="grid gap-4 lg:grid-cols-3">
				{#each truths as truth (truth.label)}
					<div class="border-surface-200-800 bg-surface-50-950 rounded-lg border p-5">
						<h3 class="mb-2 text-base font-semibold">{truth.label}</h3>
						<p class="text-sm leading-relaxed text-surface-700-300">{truth.text}</p>
					</div>
				{/each}
			</div>

			<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.75fr)] lg:items-start">
				<div>
					<div class="mb-4 flex items-center gap-3">
						<Activity class="text-primary-500 h-5 w-5" aria-hidden="true" />
						<h3 class="h3">No-spend switchover proof</h3>
					</div>
					<p class="mb-3 text-surface-700-300">
						Run these before any live probe. A healthy result should show which Codex account is selectable and why any
						other account is skipped: quota exhausted, rate-limited, degraded, dead, or blocked by local runtime.
					</p>
					<CodeBlock html={stayAfloatProofHtml} lang="bash" caption="oauth-mux/docs/onboarding.md:214-270" />
				</div>

				<aside class="border-primary-500/40 bg-primary-500/10 rounded-lg border p-5">
					<div class="mb-3 flex items-center gap-2">
						<ShieldCheck class="text-primary-600-400 h-5 w-5" aria-hidden="true" />
						<h3 class="h4">Reality check</h3>
					</div>
					<ul class="list-disc space-y-2 pl-5 text-sm leading-relaxed text-surface-700-300">
						<li>Codex selected-route, broker-owned session, and controlled fallback drills are proven.</li>
						<li>Provider-originated in-session quota fallback remains tracked by TIN-916 / GitHub #131.</li>
						<li>
							The paid cohort claim policy and no-spend soak helper are shipped; the evidence window is in progress.
						</li>
					</ul>
				</aside>
			</div>

			<div class="grid gap-8 lg:grid-cols-2">
				<div>
					<div class="mb-4 flex items-center gap-3">
						<UserPlus class="text-primary-500 h-5 w-5" aria-hidden="true" />
						<h3 class="h3">Enroll the N+1 account</h3>
					</div>
					<p class="mb-3 text-surface-700-300">
						Enrollment mutates oauth-mux-owned config and store scaffolding only. Upstream login remains a user-mediated
						handoff, then <code class="font-mono">stay-afloat refresh</code> records fresh evidence.
					</p>
					<CodeBlock html={enrollmentHandoffHtml} lang="bash" caption="oauth-mux/docs/onboarding.md:51-69" />
				</div>

				<div>
					<div class="mb-4 flex items-center gap-3">
						<ShieldCheck class="text-primary-500 h-5 w-5" aria-hidden="true" />
						<h3 class="h3">Repair without silent auth</h3>
					</div>
					<p class="mb-3 text-surface-700-300">
						Execute mode runs at most one admitted non-interactive action. Interactive reauth is queued as a redacted
						handoff, not performed in the background.
					</p>
					<CodeBlock html={reauthHandoffHtml} lang="bash" caption="oauth-mux/docs/onboarding.md:248-260" />
				</div>
			</div>

			<div class="border-surface-200-800 rounded-lg border p-5">
				<div class="mb-4 flex items-center gap-3">
					<Video class="text-primary-500 h-5 w-5" aria-hidden="true" />
					<h3 class="h3">Demo/video target</h3>
				</div>
				<p class="mb-3 text-surface-700-300">
					Once the demo accounts are enrolled, the clean recording is a terminal split: left side shows one account
					unavailable and another selectable; right side runs the harness through <code class="font-mono"
						>oauth-mux exec</code
					>
					without a manual logout/login dance.
				</p>
				<CodeBlock html={videoDemoHtml} lang="bash" caption="demo storyboard, gated on demo account enrollment" />
			</div>
		</div>
	</div>
</section>
