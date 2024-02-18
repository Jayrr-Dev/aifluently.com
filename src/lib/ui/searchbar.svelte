<script lang="ts">
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import Fuse from 'fuse.js';
	import { goto } from '$app/navigation';

	// review options
	let reviewsOptions: AutocompleteOption<string>[] = [];
	let fuse: Fuse<AutocompleteOption<string>>;
	let userInput: string = '';

	// Function to fetch product reviews based on the search query
	async function fetchProductReviews() {
		const { data, error } = await supabase.from('product_review').select('*');

		if (error) {
			console.error('Error fetching product reviews:', error);
			return;
		}

		// transform the fetched data to fit autocompletoption format
		reviewsOptions = data.map((review) => {
			return {
				label: review.product_name,
				meta: {
					slug: review.product_slug
				},
				value: review.review_id,
				keywords: review.product_highlights
			};
		});

		// initliaze fuse.js
		fuse = new Fuse(reviewsOptions, {
			keys: ['label', 'keywords']
		});

		return data;
	}

	function fuzzyFinding(): AutocompleteOption<string>[] {
		let _options = [...reviewsOptions];
		let result = fuse.search(userInput);
		const filteredOptions: AutocompleteOption<string>[] = result.map((item) => {
			return _options[item.refIndex];
		});
		return filteredOptions;
	}

	// Use onMount to ensure this runs when the component mounts
	onMount(async () => {
		await fetchProductReviews();
	});

	// popup demo

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	let onPopupDemoSelect = (event: CustomEvent<AutocompleteOption<string>>) => {
		const detail = event.detail as { meta: { slug: string } };
		const slug: string = detail.meta.slug ?? '';
		goto(`/${slug}`);
	};
</script>

<input
	class="w-full max-w-xs rounded-md"
	type="search"
	name="autocomplete-search"
	bind:value={userInput}
	placeholder="Search..."
	use:popup={popupSettings}
/>
<div
	data-popup="popupAutocomplete"
	class="absolute z-10 w-full max-w-xs box-border bg-white border border-gray-300 shadow-md rounded-md top-full left-0"
>
	<Autocomplete
		bind:input={userInput}
		options={userInput ? reviewsOptions : []}
		on:selection={onPopupDemoSelect}
		filter={fuzzyFinding}
	/>
</div>
