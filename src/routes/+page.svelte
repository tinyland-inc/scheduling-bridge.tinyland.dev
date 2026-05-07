<script lang="ts">
  // scheduling-bridge.tinyland.dev — Tinyland brand surface
  // Replace this placeholder when content is ready.
  const brand = {
    domain: "scheduling-bridge.tinyland.dev",
    tagline: "Monadic booking middleware for hostile calendar stacks",
    blurb: "Brute-force your way to scheduling freedom. Acuity, cal.com, Vagaro, GlossGenius backend interop. Companion surface to the @tummycrypt/scheduling-bridge npm package.",
    tier: "Tier 2 \u2014 strategic",
  };
</script>

<svelte:head>
  <title>scheduling-bridge.tinyland.dev — Monadic booking middleware for hostile calendar stacks</title>
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
  <footer class="pt-12 text-sm text-surface-500">
    Part of the Tinyland enterprise — federated through
    <a class="underline" href="https://tinyland.dev">tinyland.dev</a>.
  </footer>
</main>
