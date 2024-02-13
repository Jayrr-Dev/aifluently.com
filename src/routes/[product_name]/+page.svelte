<script lang="ts">
	import { get, writable } from 'svelte/store';
	import { marked } from 'marked';
	import { Image } from '@unpic/svelte';
	import { blurhashToCssGradientString } from '@unpic/placeholder';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Stars from '$lib/svg/stars.svelte';
	import Linkicon from '$lib/svg/linkicon.svelte';
	import Backbtn from '$lib/svg/backbtn.svelte';
	import Relatedcardlist from '$lib/ui/relatedcardlist.svelte';
	import Cardgallery from '$lib/ui/cardgallery.svelte';
	import Imagecard from '$lib/ui/imagecard.svelte';
	import type { ProductReviewData } from '$lib/types';
	import { goto } from '$app/navigation';
	import { lighttoggle } from '../../stores/store';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { productReviewCache } from '../../stores/productStore';
	import type { Product } from '$lib/types';
	export let data: any;
	const placeholder = blurhashToCssGradientString('L48W{f-p00E0~pWBs.s:?cNGRjWB');
	let element;
	//const productReviewCache = writable<Record<string, ProductReviewData | null>>;({});

	// productReviewCache.subscribe((cache) => {
	// 	//console.log('Cache updated:', cache);
	// })

	// Reactive variables based on productReviewData

	productReviewCache.update((cache) => ({ ...cache, ...data }));

	let productReviewData = get(productReviewCache).props?.productReviewData;
	let relatedProductsData = get(productReviewCache).props?.relatedProducts;
	$: $page.params.product_name,
		(productReviewData = get(productReviewCache).props?.productReviewData);
	$: $page.params.product_name,
		(relatedProductsData = get(productReviewCache).props?.relatedProducts);

	// Reactive variables based on productReviewData
	$: name = productReviewData?.product_name ?? 'No name';
	$: rating = productReviewData?.product_rating ?? 'No rating';
	$: reviewMarkdown = productReviewData?.product_review ?? 'No review';
	$: image = productReviewData?.product_review_image ?? 'No image';
	$: alt = productReviewData?.product_review_alt ?? 'No alt text';
	$: reviewHTML = reviewMarkdown ? marked.parse(reviewMarkdown) : 'No review';
	$: url = productReviewData?.product_table.product_url ?? 'No url';
	$: logo = productReviewData?.product_table.product_logo ?? 'No logo';
	$: pricing = productReviewData?.product_pricing ?? 'No pricing';
	$: inputPrice = productReviewData?.product_input_price ?? 'No input price';
	$: outputPrice = productReviewData?.product_output_price ?? 'No output price';
	$: quality = productReviewData?.product_quality ?? 'No quality';
	$: description = productReviewData?.product_description ?? 'No description';
	$: pro = productReviewData?.product_pro ?? [];
	$: con = productReviewData?.product_con ?? [];
	$: lightswitch = $lighttoggle;
	$: $page.params.product_name, updateCache(data);

	function updateCache(data: any) {
		productReviewCache.update((cache) => ({ ...cache, ...data }));
	}
</script>

{#if productReviewData && image}
	<section class="grid grid-col-1 md:grid-col-1 lg:grid-cols- xl:grid-cols-2 md:mx-10 xl:mx-32">
		<div id="hero" class=" h-full flex flex-col">
			<div id="product-image" class="flex-grow grid card mb-4">
				<div id="images" class="flex justify-center relative fade-in">
					<Image
						class="fade-in rounded-t-md rounded-b-sm "
						src={image}
						layout="constrained"
						priority="true"
						width={1000}
						height={500}
						background={placeholder}
						{alt}
					/>
					<button on:click={() => goto('../')} class="absolute top-3 left-3 z-20">
						<Backbtn />
					</button>
					<div
						id="overlay"
						class=" w-full absolute h-52 rounded-t-lg top-0 z-10 bg-gradient-to-b from-surface-500 to-surface-500/0"
					></div>
					<div class=" w-full absolute h-40 rounded-t-md pt-4 z-10">
						<h1 class=" text-2xl text-center sm:text-center">
							<div class="flex justify-center">
								{name}
								{#if logo !== 'No logo'}
									<Image
										class="ml-4 fade-in  rounded-full"
										src={logo}
										priority="true"
										width={32}
										height={32}
										background={placeholder}
										{alt}
									/>
								{/if}
							</div>
						</h1>

						<!-- !Product Rating -->

						<Ratings value={Math.round(((+rating || 0) / 20) * 2) / 2} max={5}>
							<svelte:fragment slot="empty"><Stars type="empty" /></svelte:fragment>
							<svelte:fragment slot="half"><Stars type="half" /></svelte:fragment>
							<svelte:fragment slot="full"><Stars type="full" /></svelte:fragment>
						</Ratings>
						<p class=" text-center text-sm opacity-80 text-ellipsis overflow-hidden">
							{description}
						</p>
					</div>

					<button
						on:click={() => {
							window.open(url, '_blank');
						}}
						class="btn variant-ghost text-white text-base md:text-xl lg:text-2xl absolute bottom-1/3 w-1/3"
					>
						<span>Visit</span><Linkicon />
					</button>
				</div>
			</div>
			<div class="card px-10 pt-4 mb-4 flex-grow">
				<h1>pricing</h1>
				{pricing}
			</div>
			<div class="parent-element">
				<Relatedcardlist
					icon=""
					product_data={relatedProductsData}
					tag={1}
					outer_height="300"
					inner_height="190"
				/>
			</div>
		</div>

		<div id="overview" class="card mt-4 lg:mt-0 lg:ml-4">
			<div id="pros and cons" class="  grid grid-cols-1 md:grid-cols-2">
				<div>
					<h2 class="text-2xl text-center p-8">Strenghts</h2>
					<ol class=" h-46 overflow-y-auto">
						{#each pro || [] as _, i}
							<div class="flex px-10 pb-2">
								<span>-</span>
								<li class="pl-4">{pro[i]}</li>
							</div>
						{/each}
					</ol>
				</div>
				<div>
					<h2 class="text-2xl text-center p-8">Weaknesses</h2>
					<ol class=" h-46 overflow-y-auto">
						{#each con || [] as _, i}
							<div class="flex px-10 pb-2">
								<span>-</span>
								<li class="pl-4">{con[i]}</li>
							</div>
						{/each}
					</ol>
				</div>
			</div>

			<div class="border-b-2 border-black/50 mx-10 mt-4"></div>
			<h2 class="text-2xl text-center p-8">Overview</h2>

			<div class="relative h-[430px]">
				<p class="h-[430px] overflow-y-scroll px-10 pb-10">{@html reviewHTML}</p>
				{#if lightswitch}
					<div
						class=" pointer-events-none h-16 absolute w-full bottom-0 bg-gradient-to-t from-surface-800 to-surface-800/0"
					></div>
				{:else}
					<div
						class=" pointer-events-none h-16 absolute w-full bottom-0 bg-gradient-to-t from-surface-50 to-white/0"
					></div>
				{/if}
			</div>
		</div>
	</section>
{/if}
<div class="md:mx-10 xl:mx-32 my-4 card p-4">
	<Imagecard />
</div>
<div class="md:mx-10 xl:mx-32 my-4 card p-4">
	<Cardgallery />
</div>

<style>
	.fade-in {
		opacity: 0;
		animation: fadeInAnimation ease 1s;
		animation-fill-mode: forwards;
	}

	@keyframes fadeInAnimation {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
