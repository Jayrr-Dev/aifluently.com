<script lang="ts">
	import Cardlist from '$lib/ui/cardlist.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	import type { Writable } from 'svelte/store';
	import { writable, get } from 'svelte/store';
	import {
		main,
		business,
		education,
		entertainment,
		technology,
		creative,
		lifestyle
	} from '../stores/tagsStore';
	import { supabase } from '$lib/supabaseClient';
	import type { CategoryData, Category, TagsState } from '$lib/types';
	export let data;
	export let categoryData: any;
	let categoriesData: any = data.props.categoriesData;
	let categoryStore = writable(categoryData);
	let currentCategoryId = categoryData?.category_id || 1; // Default or fetched category ID
	let fadeOptions = { duration: 1000 };
	const initialState: CategoryData = {
		tags: [],
		tagProductDetails: [],
		tagsLoaded: false,
		fetched: false
	};

	// Subscribe to the store
	let state: any;
	let category: number = 1;
	const categories: Category[] = [
		{ id: 1, name: 'Main' },
		{ id: 2, name: 'Business' },
		{ id: 3, name: 'Education' },
		{ id: 4, name: 'Entertainment' },
		{ id: 5, name: 'Technology' },
		{ id: 6, name: 'Creative' },
		{ id: 7, name: 'Lifestyle' }
	];

	const categoryStores = new Map<number, Writable<TagsState>>([
		[1, main],
		[2, business],
		[3, education],
		[4, entertainment],
		[5, technology],
		[6, creative],
		[7, lifestyle]
	]);

	// Determine whether to bypass our intersecting check
	onMount(() => {
		populateStores(categoriesData);
	});

	// Function to change category
	async function changeCategory(newCategory: number) {
		category = newCategory;
	}

	type CategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7;
	function isValidCategoryId(category_id: number): category_id is CategoryId {
		return [1, 2, 3, 4, 5, 6, 7].includes(category_id);
	}
	// Function to populate stores
	function populateStores(categoriesData: any[]) {
		const stores = [main, business, education, entertainment, technology, creative, lifestyle];
		categoriesData.forEach((data, index) => {
			if (data) {
				stores[index].set(data);
			}
		});
	}
	async function getCategoryData(category_id: number): Promise<any> {
		// Validate category_id is valid
		if (!isValidCategoryId(category_id)) {
			console.error('Invalid category ID');
			return null;
		}

		const currentStore = categoryStores.get(category_id);

		if (!currentStore) {
			console.error('Store not found for category ID:', category_id);
			return null;
		}

		// Attempt to retrieve cached data from the local storage store
		let cachedData = get(currentStore);

		// If cached data exists, return it without fetching
		if (cachedData && Object.keys(cachedData).length !== 0) {
			return cachedData;
		}

		// Fetch new data if not cached
		const { data, error } = await supabase
			.from('aggregated_category_info')
			.select('*')
			.eq('category_id', category_id)
			.order('category_id', { ascending: true })
			.single();

		if (error) {
			console.error(error);
			return null;
		}

		// Update the correct store with fetched data
		currentStore.set(data);

		return data;
	}

	$: {
		if (isValidCategoryId(category)) {
			getCategoryData(category).then((data) => {
				state = data; // Assuming 'state' holds the current category data for the UI
			});
		}
	}

	// TODO testing -
	function clearCategoryData(): void {
		const currentStore = categoryStores.get(category);
		if (!currentStore) {
			console.error('Invalid category ID for clearing data');
			return;
		}

		// Clear the data in the current store
		currentStore.set({});

		// Optionally reset the local component state
		state = initialState; // Assuming you have an initialState defined
	}

	let product_data: string = 'test';
	$: product_data = categoriesData[category - 1]; // Reactive declaration to update product_data when categoryStore changes
</script>

<!-- {#if data}
	<pre>{JSON.stringify(categoriesData[0], null, 2)}</pre>
{/if} -->

<button on:click={clearCategoryData}>1.1</button>

<header class=" text-center p-2">
	<div class="flex justify-center items-center h-32">
		<img class="h-full w-auto" src="/assets/logo/horizontal-gradient.svg" alt="AI FLUENTLY logo" />
	</div>
</header>

<div class="grid justify-center w-full">
	<div
		class="snap-x scroll-px-4 snap-mandatory no-scrollbar scroll-smooth flex gap-4 overflow-x-auto px-4 py-10"
	>
		{#each categories as cat}
			<button
				class="snap-start shrink-0 card py-2 w-32 md:w-32 text-center {category === cat.id
					? 'bg-[#00A8B1] '
					: ' text-black'}"
				on:click={() => changeCategory(cat.id)}
			>
				{cat.name}
			</button>
		{/each}
	</div>
</div>

<!-- .aggregated_data[0].product_table[0].product_name -->
<!-- {#if $categoryStore}
	<pre>{JSON.stringify($categoryStore, null, 2)}</pre>
{/if} -->
<!-- 
<Cardlist
	tag={0}
	{category}
	{product_data}
	outer_height="810px"
	inner_height="670px"
	icon="quill:chat"
/>
<Cardlist
	tag={1}
	{category}
	{product_data}
	outer_height="290px"
	inner_height="160px"
	icon="quill:chat"
/>
<Cardlist
	tag={2}
	{category}
	{product_data}
	outer_height="500px"
	inner_height="500px"
	icon="quill:chat"
/> -->
{#if data}
	{#if category >= 1}
		<div in:fade={fadeOptions}>
			<section
				class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5 mb-5 mx-10 lg:mx-32 xl:mx-32"
			>
				<!-- row 1 -->
				<div class="h-full parent-element">
					<Cardlist
						tag={0}
						{category}
						{product_data}
						outer_height="810px"
						inner_height="670px"
						icon="quill:chat"
					/>
				</div>

				<!-- row 2 -->
				<div class="h-full grid gap-5">
					<div class="parent-element">
						<Cardlist
							tag={1}
							{category}
							{product_data}
							outer_height="290px"
							inner_height="160px"
							icon="quill:chat"
						/>
					</div>
					<div class="parent-element">
						<Cardlist
							tag={2}
							{category}
							{product_data}
							outer_height="500px"
							inner_height="500px"
							icon="quill:chat"
						/>
					</div>
				</div>

				<!-- row 3 -->
				<div class="h-full grid gap-5">
					<div class="parent-element">
						<Cardlist
							tag={3}
							{category}
							{product_data}
							outer_height="500px"
							inner_height="500px"
							icon="quill:chat"
						/>
					</div>
					<div class="parent-element">
						<Cardlist
							tag={4}
							{category}
							{product_data}
							outer_height="290px"
							inner_height="160px"
							icon="quill:chat"
						/>
					</div>
				</div>

				<!-- row 4 -->
				<div class="h-full parent-element">
					<Cardlist
						tag={5}
						{category}
						{product_data}
						outer_height="810px"
						inner_height="670px"
						icon="quill:chat"
					/>
				</div>
			</section>

			<section
				class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5 mx-10 lg:gap-5 lg:mx-32 xl:mx-32"
			>
				<!-- row 1 -->
				<div class="h-full grid gap-5">
					<div class="parent-element">
						<Cardlist
							tag={6}
							{category}
							{product_data}
							outer_height="500px"
							inner_height="500px"
							icon="quill:chat"
						/>
					</div>
					<div class="parent-element">
						<Cardlist
							tag={7}
							{category}
							{product_data}
							outer_height="290px"
							inner_height="160px"
							icon="quill:chat"
						/>
					</div>
				</div>

				<!-- row 2 -->
				<div class="h-full grid gap-5">
					<div class="parent-element">
						<Cardlist
							tag={8}
							{category}
							{product_data}
							outer_height="290px"
							inner_height="160px"
							icon="quill:chat"
						/>
					</div>
					<div class="parent-element">
						<Cardlist
							tag={9}
							{category}
							{product_data}
							outer_height="500px"
							inner_height="500px"
							icon="quill:chat"
						/>
					</div>
				</div>

				<!-- row 3 -->
				<div class="h-full grid gap-5">
					<div class="parent-element">
						<Cardlist
							tag={10}
							{category}
							{product_data}
							outer_height="500px"
							inner_height="500px"
							icon="quill:chat"
						/>
					</div>
					<div class="parent-element">
						<Cardlist
							tag={11}
							{category}
							{product_data}
							outer_height="290px"
							inner_height="160px"
							icon="quill:chat"
						/>
					</div>
				</div>
				<!-- row 4 -->
				<div class="h-full grid gap-5">
					<div class="parent-element">
						<Cardlist
							tag={12}
							{category}
							{product_data}
							outer_height="290px"
							inner_height="160px"
							icon="quill:chat"
						/>
					</div>
					<div class="parent-element">
						<Cardlist
							tag={12}
							{category}
							{product_data}
							outer_height="500px"
							inner_height="500px"
							icon="quill:chat"
						/>
					</div>
				</div>
			</section>
		</div>
		{#if category >= 2}
			<div in:fade={fadeOptions}>
				<section
					class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5 mx-10 lg:gap-5 lg:mx-32 xl:mx-32"
				>
					<!-- row 1 -->
					<div class="h-full grid gap-5">
						<div class="parent-element">
							<Cardlist
								tag={6}
								{category}
								{product_data}
								outer_height="500px"
								inner_height="500px"
								icon="quill:chat"
							/>
						</div>
						<div class="parent-element">
							<Cardlist
								tag={7}
								{category}
								{product_data}
								outer_height="290px"
								inner_height="160px"
								icon="quill:chat"
							/>
						</div>
					</div>

					<!-- row 2 -->
					<div class="h-full grid gap-5">
						<div class="parent-element">
							<Cardlist
								tag={8}
								{category}
								{product_data}
								outer_height="290px"
								inner_height="160px"
								icon="quill:chat"
							/>
						</div>
						<div class="parent-element">
							<Cardlist
								tag={9}
								{category}
								{product_data}
								outer_height="500px"
								inner_height="500px"
								icon="quill:chat"
							/>
						</div>
					</div>

					<!-- row 3 -->
					<div class="h-full grid gap-5">
						<div class="parent-element">
							<Cardlist
								tag={10}
								{category}
								{product_data}
								outer_height="500px"
								inner_height="500px"
								icon="quill:chat"
							/>
						</div>
						<div class="parent-element">
							<Cardlist
								tag={11}
								{category}
								{product_data}
								outer_height="290px"
								inner_height="160px"
								icon="quill:chat"
							/>
						</div>
					</div>
					<!-- row 4 -->
					<div class="h-full grid gap-5">
						<div class="parent-element">
							<Cardlist
								tag={12}
								{category}
								{product_data}
								outer_height="290px"
								inner_height="160px"
								icon="quill:chat"
							/>
						</div>
						<div class="parent-element">
							<Cardlist
								tag={12}
								{category}
								{product_data}
								outer_height="500px"
								inner_height="500px"
								icon="quill:chat"
							/>
						</div>
					</div>
				</section>

				<section
					class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5 mx-10 lg:gap-5 lg:mx-32 xl:mx-32"
				>
					<!-- row 1 -->
					<div class="h-full grid gap-5">
						<div class="parent-element">
							<Cardlist
								tag={6}
								{category}
								{product_data}
								outer_height="500px"
								inner_height="500px"
								icon="quill:chat"
							/>
						</div>
						<div class="parent-element">
							<Cardlist
								tag={7}
								{category}
								{product_data}
								outer_height="290px"
								inner_height="160px"
								icon="quill:chat"
							/>
						</div>
					</div>

					<!-- row 2 -->
					<div class="h-full grid gap-5">
						<div class="parent-element">
							<Cardlist
								tag={8}
								{category}
								{product_data}
								outer_height="290px"
								inner_height="160px"
								icon="quill:chat"
							/>
						</div>
						<div class="parent-element">
							<Cardlist
								tag={9}
								{category}
								{product_data}
								outer_height="500px"
								inner_height="500px"
								icon="quill:chat"
							/>
						</div>
					</div>

					<!-- row 3 -->
					<div class="h-full grid gap-5">
						<div class="parent-element">
							<Cardlist
								tag={10}
								{category}
								{product_data}
								outer_height="500px"
								inner_height="500px"
								icon="quill:chat"
							/>
						</div>
						<div class="parent-element">
							<Cardlist
								tag={11}
								{category}
								{product_data}
								outer_height="290px"
								inner_height="160px"
								icon="quill:chat"
							/>
						</div>
					</div>
					<!-- row 4 -->
					<div class="h-full grid gap-5">
						<div class="parent-element">
							<Cardlist
								tag={12}
								{category}
								{product_data}
								outer_height="290px"
								inner_height="160px"
								icon="quill:chat"
							/>
						</div>
						<div class="parent-element">
							<Cardlist
								tag={12}
								{category}
								{product_data}
								outer_height="500px"
								inner_height="500px"
								icon="quill:chat"
							/>
						</div>
					</div>
				</section>
			</div>
		{/if}
	{/if}
{/if}

<style>
	/* Custom styles for removing scrollbar visibility */
	.no-scrollbar::-webkit-scrollbar {
		display: none; /* for Safari, Chrome, Opera */
	}
	.no-scrollbar {
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
	}
</style>
