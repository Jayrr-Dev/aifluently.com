<script lang="ts">
	//ui
	import Footer from '$lib/ui/footer.svelte';
	//supabase
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { lighttoggle } from '../stores/store';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { get } from 'svelte/store';
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	//popups

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	//supabase
	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
	});

	// Function to toggle the lightswitch
	function toggleLightswitch() {
		lighttoggle.update((value: boolean | undefined) => !value);
	}

	$: lightswitch = $lighttoggle;
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>
<!-- App Shell -->
{lightswitch}
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					{#if lightswitch}
						<img
							class="h-full w-10"
							src="/assets/logo/logomark-black-circle.svg"
							alt="AI FLUENTLY logo"
						/>
					{:else}
						<img
							class="h-full w-10"
							src="/assets/logo/logomark-white-circle.svg"
							alt="AI FLUENTLY logo"
						/>
					{/if}
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>

				<LightSwitch on:click={() => toggleLightswitch()} />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
