<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import Fuse from 'fuse.js';

	interface Option {
		id: string;
		title: string;
		description: string;
		slug: string; // Used for navigation
		logo: string; // used as an icon
	}

	let userInput = '';

	// search results is the results fetched from the database
	let searchResults: Option[] = [];

	// filtered results is used as the fuzzy finder filter
	let filteredResults: Option[] = [];
	let fuse: Fuse<Option>;
	let isDropdownVisible = false;
	let placeholderLogo = 'https://via.placeholder.com/150';

	/**
	 * Fetch product reviews from the database
	 */
	async function fetchSearchResults() {
		const { data, error } = await supabase.from('product_review').select('*');
		if (error) {
			console.error('Error fetching product reviews:', error);
			return;
		}

		// transform the fetched data to fit option data
		searchResults = data.map((review) => {
			return {
				id: review.review_id,
				title: review.product_name,
				description: review.product_highlight,
				slug: review.product_slug,
				logo: review.product_logo
			};
		});

		// initliaze fuse.js
		fuse = new Fuse(searchResults, {
			keys: ['title']
		});
	}

	/**
	 * Function to filter search results based on the user input
	 */
	function fuzzyFinding() {
		let _options = [...searchResults];
		let result = fuse.search(userInput);
		filteredResults = result.map((item) => {
			return _options[item.refIndex];
		});
	}

	// Use onMount to ensure this runs when the component mounts
	onMount(async () => {
		await fetchSearchResults();
	});

	/**
	 * Handles when user input changes (when they type in the search bar)
	 * @param event - the input event
	 */
	function handleInputChange(event: Event) {
		const input = event.target as HTMLInputElement;
		userInput = input.value;

		// if the user input is empty, hide the dropdown
		if (userInput.trim() === '') {
			isDropdownVisible = false;
			return;
		}
		console.log('userInput:', filteredResults);

		// if the user input is not empty, show the dropdown and filter the results
		fuzzyFinding();
		isDropdownVisible = true;
	}

	/**
	 * Function that handles when user clicks an option
	 * @param slug - the slug of the selected option
	 */
	function selectResult(slug: string) {
		userInput = '';
		goto(`/product/${slug}`);
		isDropdownVisible = false;
	}
</script>

<div class="search-container">
	<input
		class="w-full max-w-xs rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
		type="search"
		name="custom-autocomplete-search"
		bind:value={userInput}
		on:input={handleInputChange}
		placeholder="Search..."
	/>

	<!-- The dropdown is only visible when the user input is not empty and there are search results -->
	{#if isDropdownVisible && searchResults.length > 0}
		<div
			class="results-dropdown absolute z-10 w-full max-w-xs bg-white border border-gray-300 shadow-md rounded-md"
		>
			{#each filteredResults as result}
				<button
					class="flex items-center w-full text-left p-2 hover:bg-gray-100"
					on:click={() => selectResult(result.slug)}
				>
					<img
						class="w-12 h-12 object-cover mr-2 rounded-md"
						src={result.logo ? result.logo : placeholderLogo}
						alt={result.title}
					/>
					<div>
						<h3 class="font-semibold">{result.title}</h3>
						<p class="text-sm text-gray-600">{result.description}</p>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>
