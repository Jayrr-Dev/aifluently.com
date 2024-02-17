<script lang="ts">
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	// Function to fetch product reviews based on the search query
	async function fetchProductReviews() {
		const { data, error } = await supabase.from('product_review').select('*');

		if (error) {
			console.error('Error fetching product reviews:', error);
			return;
		}
		return data;
	}

	// Use onMount to ensure this runs when the component mounts
	onMount(async () => {
		const reviews = await fetchProductReviews();
		console.log(reviews);
	});

	// popup demo

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
	let inputPopupDemo: string = '';

	const flavorOptions: AutocompleteOption<string>[] = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{
			label: 'Neapolitan',
			value: 'neapolitan',
			keywords: 'mix, strawberry, chocolate, vanilla',
			meta: { healthy: false }
		},
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];

	let onPopupDemoSelect = (event: CustomEvent<AutocompleteOption<string>>) => {
		console.log('Selected:', event.detail);
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
		options={flavorOptions}
		on:selection={onPopupDemoSelect}
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
