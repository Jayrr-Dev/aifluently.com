<script lang="ts">
	import { productReviewCache } from '../../stores/productStore';
	import { get } from 'svelte/store';
	import { Image } from '@unpic/svelte';
	import { Ratings } from '@skeletonlabs/skeleton';
	let relatedProductsData = get(productReviewCache);
	import { blurhashToCssGradientString } from '@unpic/placeholder';
	const placeholder = blurhashToCssGradientString('L48W{f-p00E0~pWBs.s:?cNGRjWB');
	import Linkicon from '$lib/svg/linkicon.svelte';
	import Stars from '$lib/svg/stars.svelte';
	import { goto } from '$app/navigation';
	$: relatedProducts = relatedProductsData.props?.relatedProducts;
</script>

<!-- <pre>
    {JSON.stringify(relatedProductsData?.props?.relatedProducts, null, 2)}
</pre> -->

{#if relatedProductsData?.props?.relatedProducts}
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1">
		{#each relatedProducts as _, i}
			<div id="product-image" class=" max-w-full rounded-lg relative card parent-hover mb-4">
				<div id="images" class="flex h-full justify-center fade-in">
					<Image
						class="fade-in rounded-t-md rounded-b-sm"
						src={relatedProducts[i].product_review_image}
						layout="constrained"
						priority="true"
						width={1000}
						height={500}
						background={placeholder}
						alt={relatedProducts[i].product_review_alt}
					/>

					<!-- <div
						id="overlay"
						class=" w-full absolute h-52 rounded-t-lg top-0 z-10 bg-gradient-to-b from-surface-500 to-surface-500/0"
					></div> -->
					<div
						id="overlay-hover"
						class=" w-full absolute h-full parent-hover overlay-fade rounded-t-lg top-0 z-10 blur-lg bg-slate-300/40"
					></div>

					<div class="absolute w-full h-full top-[30%] z-10">
						<div id="name-comp" class=" parent-hover overlay-fade">
							<h1 class="text-3xl sm:text-xl md:text-2xl lg:text-3xl text-center sm:text-center">
								<div class="flex justify-center">
									{relatedProducts[i].product_name}
									{#if relatedProducts[i].product_logo}
										<Image
											class="ml-4 fade-in rounded-full "
											src={relatedProducts[i].product_logo}
											priority="true"
											width={32}
											height={32}
											background={placeholder}
											alt={relatedProducts[i].product_logo_alt}
										/>
									{:else}
										<div />
									{/if}
								</div>
							</h1>

							<!-- !Product Rating -->

							<Ratings
								value={Math.round(((+relatedProducts[i].product_rating || 0) / 20) * 2) / 2}
								max={5}
							>
								<svelte:fragment slot="empty"><Stars type="empty" /></svelte:fragment>
								<svelte:fragment slot="half"><Stars type="half" /></svelte:fragment>
								<svelte:fragment slot="full"><Stars type="full" /></svelte:fragment>
							</Ratings>
							<p class=" text-center text-sm opacity-80 text-ellipsis overflow-hidden">
								{relatedProducts[i].product_highlight}
							</p>
						</div>
					</div>

					<div class="absolute w-full top-1/2 left-1/2 ml-[-150px] mt-[-40px] h-full">
						<div class="grid grid-cols-1 gap-1">
							<button
								on:click={() => {
									goto(`${relatedProducts[i].product_slug}`);
								}}
								class="parent-hover overlay-show btn variant-ghost-primary w-[300px] h-[40px] text-white text-base md:text-xl lg:text-2xl z-30 opacity-0"
							>
								<span>Review</span><Linkicon />
							</button>
							<button
								on:click={() => {
									window.open(relatedProducts[i].product_url, '_self');
								}}
								class="parent-hover overlay-show btn variant-ghost-primary w-[300px] h-[40px] text-white text-base md:text-xl lg:text-2xl z-30 opacity-0"
							>
								<span>Visit</span><Linkicon />
							</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
