<script lang="ts">
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { supabase } from '$lib/supabaseClient';
	import { marked } from 'marked';

	type ProductReviewData = {
		review_id: number;
		product_id: number;
		product_name: string;
		product_rating: number;
		product_review: string | null;
		product_review_image: string | null;
		product_review_alt: string | null;
	};
	export let data: any;
	const productReviewCache = writable<{ [key: string]: ProductReviewData | null }>({});

	let productReviewData: ProductReviewData | null = null;

	$: if (browser) {
		const slug = $page.params.product_name;
		const unsubscribe = productReviewCache.subscribe((cache) => {
			productReviewData = cache[slug] ?? null;
		});
		if (!productReviewData) {
			fetchProductReviewData(slug);
		}
		// Cleanup subscription to prevent memory leaks
		unsubscribe();
	}

	async function fetchProductReviewData(slug: string) {
		const { data, error } = await supabase
			.from('product_review')
			.select('*')
			.ilike('product_slug', slug);
		if (error) {
			console.error('Failed to fetch product review data for:', slug, error);
		} else {
			productReviewData = data ? data[0] : null;
			productReviewCache.update((cache) => ({ ...cache, [slug]: productReviewData }));
		}
	}

	// Reactive variables based on productReviewData
	$: name = productReviewData?.product_name ?? 'No name';
	$: rating = productReviewData?.product_rating ?? 'No rating';
	$: reviewMarkdown = productReviewData?.product_review ?? 'No review';
	$: image = productReviewData?.product_review_image ?? 'No image';
	$: alt = productReviewData?.product_review_alt ?? 'No alt text';
	$: reviewHTML = reviewMarkdown ? marked.parse(reviewMarkdown) : 'No review';
</script>

<!-- <pre>
	{JSON.stringify(data, null, 2)}
</pre> -->

{#if productReviewData && image}
	<h1>{name}</h1>
	<h2>{rating}</h2>
	<!-- Render the Markdown converted to HTML -->
	<p>{@html reviewHTML}</p>

	<img src={image} {alt} />
{/if}
