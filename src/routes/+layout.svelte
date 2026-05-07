<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Menu, X } from '@lucide/svelte';
	import SaturnMark from '$lib/components/SaturnMark.svelte';
	import { AppBar, Dialog, Navigation } from '@skeletonlabs/skeleton-svelte';
	import { TinyVectors } from '@tummycrypt/tinyvectors';
	import '../app.css';
	import { theme } from '$lib/theme.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	let { children } = $props();

	let mobileOpen = $state(false);

	// Absolute paths so the section nav resolves from any route (`/agent-snippet`,
	// `/style-guide` etc.) without SvelteKit emitting missing-id warnings during
	// prerender. From a non-home route the link navigates back to `/` and scrolls
	// to the section. (TIN-802.)
	const navLinks: { href: string; label: string }[] = [
		{ href: '/#stay-afloat', label: 'Stay afloat' },
		{ href: '/#install', label: 'Install' },
		{ href: '/#first-run', label: 'First-run' },
		{ href: '/#security', label: 'Security' },
		{ href: '/#contribute', label: 'Contribute' },
		{ href: '/#contact', label: 'Contact' },
	];

	const REPO_URL = 'https://github.com/Jesssullivan/oauth-mux';
	const NPM_URL = 'https://www.npmjs.com/package/oauth-mux';
	const SECURITY_URL = 'https://github.com/Jesssullivan/oauth-mux/issues';
	const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;

	onMount(() => {
		theme.init();
	});

	// M3.3 SEO surface. Static values only — no per-page reactivity.
	// JSON-LD describes both the WebSite and the SoftwareApplication (the oauth-mux CLI)
	// so structured-data tooling can resolve "what is this site about" without parsing copy.
	const SITE_URL = 'https://site.scaffold';
	const SITE_TITLE = 'oauth-mux — Typed OAuth fallback for AI harness accounts';
	const SITE_DESCRIPTION =
		'oauth-mux keeps AI coding harness sessions afloat across multiple accounts with typed liveness, redacted discovery, foreground stay-afloat checks, and explicit provider-proof boundaries.';
	const OG_IMAGE = `${SITE_URL}/og-image.png`;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				url: SITE_URL,
				name: 'oauth-mux',
				description: SITE_DESCRIPTION,
				inLanguage: 'en',
			},
			{
				'@type': 'SoftwareApplication',
				'@id': `${SITE_URL}/#software`,
				name: 'oauth-mux',
				description: SITE_DESCRIPTION,
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'macOS, Linux',
				url: SITE_URL,
				codeRepository: 'https://github.com/Jesssullivan/oauth-mux',
				license: 'https://opensource.org/licenses/MIT',
				author: {
					'@type': 'Person',
					name: 'Jess Sullivan',
				},
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'USD',
				},
			},
		],
	};
</script>

<svelte:head>
	<link rel="canonical" href={SITE_URL} />
	<meta name="description" content={SITE_DESCRIPTION} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:title" content={SITE_TITLE} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:site_name" content="oauth-mux" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={OG_IMAGE} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD; JSON.stringify on a literal object is safe and the </script> sentinel is split to avoid early termination -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</` + `script>`}
</svelte:head>

<div class="relative flex min-h-screen flex-col bg-transparent">
	<!-- TinyVectors warm-omux background. Browser-only — the component uses
	     window/navigator APIs and Svelte effects that crash under SSR. Fixed
	     full-viewport, behind everything, low opacity. (TIN-801 phase 3.) -->
	{#if browser}
		<div
			class="pointer-events-none fixed inset-0 -z-10"
			style="overflow:hidden"
			aria-hidden="true"
			data-testid="omux-vectors-bg"
		>
			<TinyVectors
				theme="custom"
				colors={['#cb6738', '#d99d6a', '#a14a52', '#6b4f3a', '#3d6b8c']}
				opacity={0.1}
				blobCount={5}
				enableScrollPhysics={true}
				enableDeviceMotion={false}
			/>
		</div>
	{/if}
	<a
		href="/#hero"
		class="focus:bg-primary-500 sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
		>Skip to content</a
	>

	<AppBar class="saturn-nav sticky top-0 z-40">
		<AppBar.Toolbar class="grid-cols-[auto_1fr_auto] px-4 py-2">
			<AppBar.Lead>
				<a
					href="/"
					class="hover:text-primary-500 font-mono text-lg font-bold tracking-tight whitespace-nowrap transition-colors inline-flex items-center gap-2"
					aria-label="oauth-mux home"
				>
					<SaturnMark class="text-primary-500 h-[1.05em] w-[1.05em]" />
					oauth-mux
				</a>
			</AppBar.Lead>
			<AppBar.Headline></AppBar.Headline>
			<AppBar.Trail>
				<nav class="hidden items-center gap-4 text-sm lg:flex" aria-label="Section navigation">
					{#each navLinks as { href, label } (href)}
						<a {href} class="hover:text-primary-500 transition-colors">{label}</a>
					{/each}
					<ThemeSwitcher />
				</nav>

				<!-- Mobile drawer -->
				<Dialog
					open={mobileOpen}
					onOpenChange={(d) => {
						mobileOpen = d.open;
					}}
					closeOnInteractOutside
					closeOnEscape
					preventScroll
				>
					<Dialog.Trigger class="hover:bg-surface-200-800 rounded p-2 lg:hidden" aria-label="Open navigation">
						<Menu class="h-5 w-5" />
					</Dialog.Trigger>
					<Dialog.Backdrop class="fixed inset-0 z-40 bg-black/40" />
					<Dialog.Positioner class="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw]">
						<Dialog.Content class="bg-surface-50-950 flex w-full flex-col">
							<div class="border-surface-200-800 flex items-center justify-between border-b px-4 py-3">
								<span class="font-mono text-sm font-semibold">oauth-mux</span>
								<Dialog.CloseTrigger class="hover:bg-surface-200-800 rounded p-2" aria-label="Close navigation">
									<X class="h-5 w-5" />
								</Dialog.CloseTrigger>
							</div>
							<Navigation layout="sidebar">
								<Navigation.Content>
									<Navigation.Menu>
										{#each navLinks as { href, label } (href)}
											<Navigation.TriggerAnchor
												{href}
												onclick={() => {
													mobileOpen = false;
												}}
											>
												<Navigation.TriggerText>{label}</Navigation.TriggerText>
											</Navigation.TriggerAnchor>
										{/each}
									</Navigation.Menu>
								</Navigation.Content>
								<Navigation.Footer>
									<div class="flex w-full justify-center py-2">
										<ThemeSwitcher />
									</div>
								</Navigation.Footer>
							</Navigation>
						</Dialog.Content>
					</Dialog.Positioner>
				</Dialog>
			</AppBar.Trail>
		</AppBar.Toolbar>
	</AppBar>

	<div class="flex-1">
		{@render children?.()}
	</div>

	<footer class="border-surface-200-800 bg-surface-100-900/80 mt-16 border-t backdrop-blur-sm">
		<div class="container mx-auto flex flex-col gap-4 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
			<p class="text-surface-700-300">A Jess Sullivan FOSS project built with Tinyland release infrastructure.</p>
			<nav class="flex flex-wrap gap-4" aria-label="Footer">
				<a href={REPO_URL} target="_blank" rel="noopener" class="hover:text-primary-500 transition-colors">GitHub</a>
				<a href={NPM_URL} target="_blank" rel="noopener" class="hover:text-primary-500 transition-colors">npm</a>
				<a href={LICENSE_URL} target="_blank" rel="noopener" class="hover:text-primary-500 transition-colors">License</a
				>
				<a href={SECURITY_URL} target="_blank" rel="noopener" class="hover:text-primary-500 transition-colors"
					>Security</a
				>
			</nav>
		</div>
	</footer>
</div>
