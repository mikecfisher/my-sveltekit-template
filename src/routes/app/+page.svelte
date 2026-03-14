<script lang="ts">
	import { getClerkContext } from '$lib/stores/clerk.svelte';
	import { useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';
	import { remoteAuthedDemoQuery } from '$lib/remote/demo.remote';
	import PageError from '$lib/components/PageError.svelte';

	const clerkContext = getClerkContext();

	const demoQuery = useQuery(api.authed.demo.authedDemoQuery, {});
	$inspect(demoQuery.data);
</script>

<div class="flex min-h-screen w-full flex-col items-center justify-center">
	<svelte:boundary>
		{@const demoAuthedResult = await remoteAuthedDemoQuery()}

		<pre>{JSON.stringify(demoAuthedResult, null, 2)}</pre>

		{#snippet pending()}
			<p>loading...</p>
		{/snippet}

		{#snippet failed(error, reset)}
			<PageError {error} />
		{/snippet}
	</svelte:boundary>

	{#if clerkContext.clerk.user}
		<div
			{@attach (el) => {
				clerkContext.clerk.mountUserButton(el);
			}}
		></div>
	{:else}
		<div
			{@attach (el) => {
				clerkContext.clerk.mountSignIn(el, {});
			}}
		></div>
	{/if}
</div>
