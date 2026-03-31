<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="SvelteKit app" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<nav class="border-b border-gray-200 bg-white">
		<div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
			<a href="/" class="text-lg font-semibold text-gray-900">Home</a>
			<div class="flex gap-4">
				<a
					href="/app"
					class="text-sm text-gray-600 hover:text-gray-900"
					class:font-medium={page.url.pathname.startsWith('/app')}
				>
					App
				</a>
			</div>
		</div>
	</nav>
	<main class="mx-auto max-w-5xl px-4 py-8">
		{@render children()}
	</main>
</div>
