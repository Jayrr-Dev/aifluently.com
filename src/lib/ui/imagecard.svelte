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

	$: relatedProducts = relatedProductsData.props?.relatedProducts;
</script>

<!-- <pre>
    {JSON.stringify(relatedProductsData?.props?.relatedProducts, null, 2)}
</pre> -->

{#if relatedProductsData?.props?.relatedProducts}
	<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
		{#each relatedProducts as _, i}
			<div id="product-image" class="h-auto max-w-full rounded-lg card parent-hover mb-4">
				<div id="images" class="flex justify-center fade-in relative">
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

					<div class="absolute w-full h-full top-[35%]">
						<div id="name-comp" class=" parent-hover overlay-fade w-full absolute z-10">
							<h1 class="lg:text-3xl md:text-xl text-center sm:text-center">
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
								{relatedProducts[i].product_description}
							</p>
						</div>
					</div>

					<div class="absolute w-full h-full">
						<button
							on:click={() => {
								window.open(relatedProducts[i].product_url, '_blank');
							}}
							class="parent-hover overlay-show btn variant-ghost-primary w-1/2 text-white text-base md:text-xl lg:text-2xl absolute top-[40%] left-[25%] z-30 opacity-0"
						>
							<span>Visit</span><Linkicon />
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
