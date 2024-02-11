<script lang="ts">
	import { get, writable } from 'svelte/store';
	import { marked } from 'marked';

	type ProductReviewData = {
		productReviewData: {
			review_id: number;
			product_id: number;
			product_name: string;
			product_rating: number;
			product_review: string | null;
			product_review_image: string | null;
			product_review_alt: string | null;
			product_pro: string[] | null;
			product_con: string[] | null;
			product_pricing: string | null;
			product_input_price: number | null;
			product_output_price: number | null;
			product_quality: string | null;
			product_table: {
				product_url: string;
				product_logo: string;
			};
		};
	};
	export let data: any;

	const productReviewCache = writable<Record<string, ProductReviewData | null>>({});

	productReviewCache.subscribe((cache) => {
		//console.log('Cache updated:', cache);
	});

	productReviewCache.update((cache) => ({ ...cache, ...data }));

	let productReviewData = get(productReviewCache).props?.productReviewData;
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
</script>

<!-- <pre>
	{JSON.stringify(productReviewData, null, 2)}
</pre> -->
{#if productReviewData && image}
	<section>
		<div class="grid sm:grid-cols-1 md: lg: xl:">
			<div id="images" class="flex justify-center relative">
				<img src={image} {alt} />
				<button
					on:click={() => {
						window.open(url, '_blank');
					}}
					class="card w-20 absolute bottom-1/2"
				>
					test
				</button>
			</div>
		</div>
	</section>
{/if}

{#if productReviewData && image}
	<h1>{name}</h1>
	<h2>{rating}</h2>
	<p>{@html reviewHTML}</p>
	<img src={image} {alt} />
	{image}
{/if}
