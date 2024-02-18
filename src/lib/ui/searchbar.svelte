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
	let filteredOptions: AutocompleteOption<string>[] = [];
	let fuse: Fuse<AutocompleteOption<string>>;
	let inputPopupDemo: string = '';

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
		let result = fuse.search(inputPopupDemo);
		filteredOptions = result.map((item) => {
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
	class="input autocomplete"
	type="search"
	name="autocomplete-search"
	bind:value={inputPopupDemo}
	placeholder="Search..."
	use:popup={popupSettings}
/>
<div data-popup="popupAutocomplete" class="autocomplete-popup-content">
	<Autocomplete
		bind:input={inputPopupDemo}
		options={reviewsOptions}
		on:selection={onPopupDemoSelect}
		filter={fuzzyFinding}
	/>
</div>

<style>
	/* Ensure the container of the input and popup has a relative position */
	.autocomplete-container {
		position: relative; /* This creates a stacking context for the popup */
		max-width: 400px; /* Adjust based on your design */
		margin: 0 auto; /* Center the container if desired */
	}

	.input.autocomplete {
		width: 100%; /* Full width of the container */
		max-width: 400px;
		/* Ensure your input styles here */
	}

	/* Style the popup to make it float over other elements */
	[data-popup='popupAutocomplete'] {
		position: absolute; /* Position it relative to its nearest positioned ancestor (`.autocomplete-container` here) */
		z-index: 1000; /* High z-index to ensure it's above most other elements */
		width: 100%; /* Match the width of the search bar */
		max-width: 400px;
		box-sizing: border-box; /* Include padding and border in the element's total width and height */
		/* Additional positioning to align with the bottom of the search bar */
		top: 100%; /* Place it right below the search bar */
		left: 0; /* Align it to the left edge of the container */
		/* Style your popup box here (border, shadow, etc.) */
		border: 1px solid #ccc;
		background: white; /* Ensure it has a background to mask items below */
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
	}
</style>
