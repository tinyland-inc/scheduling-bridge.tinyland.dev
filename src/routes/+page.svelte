<script lang="ts">
	// scheduling-bridge.tinyland.dev — Tinyland brand surface.
	// This site is the brand surface only; the engine lives in its own repo.
	const ENGINE_URL = 'https://github.com/Jesssullivan/scheduling-bridge';

	const brand = {
		domain: 'scheduling-bridge.tinyland.dev',
		tagline: 'Brand site for scheduling-bridge — monadic booking middleware for hostile calendar stacks',
		blurb:
			'Companion brand surface for the scheduling-bridge engine (v0.7.1, shipped as a ghcr container). Vendor coverage is staged: Acuity is in production, Cal.com is read-only, GlossGenius and Vagaro are planned.',
		tier: 'Tier 2 — strategic',
	};

	// Vendor maturity ladder — every vendor claim carries a qualifier.
	const vendors: { name: string; status: string; detail: string }[] = [
		{ name: 'Acuity', status: 'Production', detail: 'the only production browser pack' },
		{ name: 'Cal.com', status: 'Read-only', detail: 'REST support landed upstream' },
		{ name: 'GlossGenius', status: 'Planned', detail: 'not started' },
		{ name: 'Vagaro', status: 'Planned', detail: 'not started' },
	];
</script>

<svelte:head>
	<title>scheduling-bridge.tinyland.dev — Brand site for the scheduling-bridge engine</title>
	<meta name="description" content={brand.blurb} />
</svelte:head>

<main class="mx-auto max-w-3xl px-6 py-24 space-y-8">
	<header class="space-y-3">
		<p class="text-xs uppercase tracking-widest text-surface-500">{brand.tier}</p>
		<h1 class="text-4xl md:text-5xl font-bold leading-tight">{brand.domain}</h1>
		<p class="text-xl text-primary-600">{brand.tagline}</p>
	</header>
	<p class="text-lg leading-relaxed text-surface-700 dark:text-surface-300">
		{brand.blurb}
	</p>
	<section class="space-y-3" aria-labelledby="vendor-coverage">
		<h2 id="vendor-coverage" class="text-2xl font-semibold">Vendor coverage</h2>
		<ul class="space-y-2 text-surface-700 dark:text-surface-300">
			{#each vendors as vendor (vendor.name)}
				<li class="flex flex-wrap items-baseline gap-x-2">
					<span class="font-semibold">{vendor.name}</span>
					<span class="text-xs uppercase tracking-widest text-primary-600">{vendor.status}</span>
					<span class="text-sm text-surface-500">— {vendor.detail}</span>
				</li>
			{/each}
		</ul>
	</section>
	<p class="text-surface-700 dark:text-surface-300">
		The engine itself lives at
		<a class="underline" href={ENGINE_URL} target="_blank" rel="noopener">Jesssullivan/scheduling-bridge</a>.
	</p>
	<footer class="pt-12 text-sm text-surface-500">
		Part of the Tinyland enterprise — federated through
		<a class="underline" href="https://tinyland.dev">tinyland.dev</a>.
	</footer>
</main>
