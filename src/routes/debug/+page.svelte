<script lang="ts">
	import Bentogrid from '$lib/ui/bentogrid.svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { Ratings } from '@skeletonlabs/skeleton';
	let windowWidth = 0;

	// Function to update the window width
	function updateWidth() {
		windowWidth = window.innerWidth;
	}
	onMount(() => {
		// Set initial width
		updateWidth();

		// Add event listener for window resize
		window.addEventListener('resize', updateWidth);

		// Cleanup function
		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	});
</script>

<Bentogrid>
	<h1 slot="header1">Header 1</h1>
	<li slot="list1">
		{#each { length: 10 } as tool, i}
			<ol class="flex justify-between">
				<!-- Link to Review -->
				<button on:dblclick={() => goto('/debug')}>
					<span>{i}.</span>
					<span class="badge">-</span>
					{#if windowWidth < 768}
						<span
							class="flex-auto [&>*]:pointer-events-none"
							use:popup={{ event: 'click', target: 'popupHover2-' + i, placement: 'top' }}
						>
							{i}
						</span>
					{:else}
						<span
							class="flex-auto [&>*]:pointer-events-none"
							use:popup={{ event: 'hover', target: 'popupHover2-' + i, placement: 'top' }}
						>
							{i}
						</span>
					{/if}
				</button>
				<!-- Link to Site -->
				<a href="/elements/lists" class="flex opacity-50 hover:opacity-100 p-1">
					<Icon icon="system-uicons:jump-up" />
				</a>
				<!-- Popup Styles -->
				<div
					class="card p-4 variant-filled-secondary w-[80%] sm:w-[40%] lg:w-[20%] h-40 lg:h-32"
					data-popup={'popupHover2-' + i}
				>
					<div class="grid justify-center">
						<div class="flex">
							<span class="p-1">
								<!-- <img class="h-4 w-4" src={tool.logo} alt="AI FLUENTLY logo" /> -->
							</span>
							<span
								class="font-bold flex-auto [&>*]:pointer-events-none"
								use:popup={{ event: 'hover', target: 'popupHover1-' + i, placement: 'top' }}
							>
								{i}
							</span>
						</div>
					</div>
					<div>
						<Ratings value={i} max={5}>
							<svelte:fragment slot="empty"
								><Icon icon="line-md:star-alt-twotone" color="gray" /></svelte:fragment
							>
							<svelte:fragment slot="half"
								><Icon icon="line-md:star-filled-half" color="gold" />
							</svelte:fragment>
							<svelte:fragment slot="full"
								><Icon icon="line-md:star-filled" color="gold" /></svelte:fragment
							>
						</Ratings>
					</div>
					<p class="p-1 text-sm opacity-80 text-ellipsis overflow-hidden h-16">
						{i}
					</p>
					{#if windowWidth < 768}
						<div class="flex justify-center">
							<button class="btn btn-sm w-[50%] bg-warning-500 border-2 border-black h-8">
								More
							</button>
						</div>
					{/if}
					<div class="arrow variant-filled-secondary" />
				</div>
			</ol>
		{/each}
	</li>
</Bentogrid>
