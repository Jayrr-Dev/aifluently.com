<script lang="ts">
	//database
	import { supabase } from '$lib/supabaseClient';

	import Bentogrid from '$lib/ui/bentogrid.svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Ratings } from '@skeletonlabs/skeleton';
	let windowWidth = 0;
	export let gridstart: number;
	// Function to update the window width
	function updateWidth() {
		windowWidth = window.innerWidth;
	}
	//list of products
	export let productlist: [];

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

<Bentogrid {gridstart}>
	<h1 slot="header1"><slot name="header1" /></h1>
	<li slot="list1">
		<!-- ? List of Links -->
		{#each productlist as product, i}
			<!-- ? Tooltip Styles -->
			<div
				class="card p-4 variant-filled-secondary w-[80%] sm:w-[40%] lg:w-[20%] h-40 lg:h-32"
				data-popup={'popupHover2-' + i}
			>
				<div class="grid justify-center">
					<div class="flex">
						<span class="p-1">
							<!-- !Product Logo -->
							<img
								class="rounded-full h-5 w-5 object-cover"
								src="https://logowik.com/content/uploads/images/chatgpt5223.logowik.com.webp"
								alt="AI FLUENTLY logo"
							/>
						</span>
						<span
							class="font-bold flex-auto [&>*]:pointer-events-none"
							use:popup={{ event: 'hover', target: 'popupHover1-' + i, placement: 'top' }}
						>
							<!-- !Product Name -->
							{i}
						</span>
					</div>
				</div>
				<div>
					<!-- !Product Rating -->
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
					<!-- !Product Description -->
					{i}
				</p>
				{#if windowWidth < 768}
					<!-- Product Review Button for Mobile -->
					<!-- URL REFERENCE -->
					<a href="/">
						<div class="flex justify-center">
							<button class="btn btn-sm w-[50%] bg-warning-500 border-2 border-black h-8">
								More
							</button>
						</div>
					</a>
				{/if}
				<div class="arrow variant-filled-secondary" />
			</div>
			<!-- ? Links -->
			<ol class="flex justify-between">
				<div>
					<span>
						<!-- !Number Order -->
						{i + 1}.
					</span>
					<span class="badge">
						<!-- !Logo -->
						-
					</span>
					{#if windowWidth <= 768}
						<button
							class="flex-auto [&>*]:pointer-events-none"
							use:popup={{
								event: 'click',
								target: 'popupHover2-' + i,
								placement: 'top'
							}}
						>
							<!-- !Product Name Mobile-->
							{i}
						</button>
					{:else}
						<!-- !URL REFERENCE -->
						<a href="/this">
							<span
								class="flex-auto [&>*]:pointer-events-none"
								use:popup={{ event: 'hover', target: 'popupHover2-' + i, placement: 'top' }}
							>
								<!-- !Product Name + Review Link Desktop -->
								{product}
							</span>
						</a>
					{/if}
				</div>
				<!-- !Link to Site -->
				<a href="/elements/lists" class="flex opacity-50 hover:opacity-100 p-1">
					<Icon icon="system-uicons:jump-up" />
				</a>
			</ol>
		{/each}
	</li>
</Bentogrid>
