<script lang="ts">
	export let data: any = {};
	import { productReviewCache } from '../../stores/productStore';
	import { sluglify } from '$lib/tools/sluglify';
	import { get } from 'svelte/store';
	import { Image } from '@unpic/svelte';
	import { Ratings } from '@skeletonlabs/skeleton';
	let relatedProductsData = get(productReviewCache);
	import { blurhashToCssGradientString } from '@unpic/placeholder';
	const placeholder = blurhashToCssGradientString('L48W{f-p00E0~pWBs.s:?cNGRjWB');
	import Linkicon from '$lib/svg/linkicon.svelte';
	import Stars from '$lib/svg/stars.svelte';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { tag_table } from '$lib/tools/tagToTagName';
	import { tagToCategory } from '$lib/tools/tagToCategory';
	import { catIdToCatName } from '$lib/tools/catIdToCatName';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Leftarrow from '$lib/svg/leftarrow.svelte';
	// Define the interface for a tag
	interface Tag {
		tag_id: number;
		tag_name: string;
	}

	// Define the interface for a category
	interface Category {
		category_id: number;
		tags: Tag[];
	}

	function filterAndOrganizeBySlug(data: any, slug: string) {
		if (!data) return []; // Return empty array if data is undefined or null

		const slugIndex = data.findIndex((item: any) => item.tag_name.replace(/\s/g, '') === slug);
		if (slugIndex === -1) return data; // Return original data if slug not found

		const [slugItem] = data.splice(slugIndex, 1); // Remove the item with the slug
		return [slugItem, ...data]; // Place the item with the slug at the top
	}

	function groupTagsIntoCategories(tags: Tag[], clickedTagId?: number): Category[] {
		// Define the category ranges
		const categoryRanges = [
			{ category_id: 1, max_tag_id: 14 },
			{ category_id: 2, max_tag_id: 44 },
			{ category_id: 3, max_tag_id: 74 },
			{ category_id: 4, max_tag_id: 104 },
			{ category_id: 5, max_tag_id: 134 },
			{ category_id: 6, max_tag_id: 164 },
			{ category_id: 7, max_tag_id: 194 }
		];

		// Initialize an array to store the categories
		const categories: Category[] = categoryRanges.map((range) => ({
			category_id: range.category_id,
			tags: []
		}));

		// Assign each tag to a category
		for (const tag of tags) {
			const category = categories.find(
				(category) => tag.tag_id <= categoryRanges[category.category_id - 1].max_tag_id
			);
			if (category) {
				category.tags.push(tag);
			}
		}

		// Bring the clicked tag's category to the top
		if (clickedTagId !== undefined) {
			const clickedTag = tags.find((tag) => tag.tag_id === clickedTagId);
			if (clickedTag) {
				const clickedCategoryIndex = categories.findIndex(
					(category) => clickedTag.tag_id <= categoryRanges[category.category_id - 1].max_tag_id
				);
				if (clickedCategoryIndex > -1) {
					const [clickedCategory] = categories.splice(clickedCategoryIndex, 1);
					categories.unshift(clickedCategory);
				}
			}
		}

		return categories;
	}

	let slugFiltered: any;
	let aggregated_data: any;
	$: tag_slug = data.props?.tag_slug;
	$: {
		aggregated_data =
			data.props?.categoryData?.aggregated_data?.filter(
				(item: any) => item.tag_name !== 'Uncategorized'
			) || [];
		let tag_slug = data.props?.tag_slug;
		slugFiltered = filterAndOrganizeBySlug(aggregated_data, tag_slug);
	}

	let toggle = true;

	function toggleFilter() {
		toggle = !toggle;
		//console.log(toggle);
	}

	$: filteredCategories = groupTagsIntoCategories(tag_table, 5);
</script>

<!-- <pre>
    {JSON.stringify(filteredCategories, null, 2)}
</pre> -->
<!-- <pre>
    {JSON.stringify(aggregated_data[1].product_table[0].tag_array[0], null, 2)}
</pre> -->
<!-- grid gap-2 md:gap-4 grid-cols-[150px_minmax(1px,_1fr)] md:grid-cols-[300px_minmax(300px,_1fr)] -->
{#if data}
	<div class="flex mx-1 md:mx-4">
		{#if toggle}
			<div />
		{:else}
			<div class="w-[400px] max-w-96 card h-fit mr-4">
				<div>
					<Accordion>
						<AccordionItem padding="p-1 sm:p-4 relative" autocollapse open>
							<svelte:fragment slot="iconClosed">
								<button
									class="rounded-full hover:ring-2 ring-black z-20 -translate-x-3"
									on:click={() => toggleFilter()}
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="30"
										height="30"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M14.71 6.71a.996.996 0 0 0-1.41 0L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41"
										/></svg
									>
								</button></svelte:fragment
							>

							<svelte:fragment slot="summary">
								<div class="underline">
									{catIdToCatName(filteredCategories[0].category_id)}
								</div>
							</svelte:fragment>
							<svelte:fragment slot="content">
								<div class=" grid grid-cols-1 md:grid-cols-1 gap-1">
									{#each filteredCategories[0].tags as _, j}
										<div class="flex flex-col">
											{#if tag_slug === sluglify(filteredCategories[0].tags[j].tag_name)}
												<button
													on:click={() =>
														goto(
															`/category/${tagToCategory(
																filteredCategories[0].tags[j].tag_id
															)}/${sluglify(filteredCategories[0].tags[j].tag_name)}`
														)}
													on:click={() =>
														(filteredCategories = groupTagsIntoCategories(
															tag_table,
															filteredCategories[0].tags[j].tag_id
														))}
													class="btn-sm relative bg-yellow-300 border-[1px] rounded-lg w-full h-full text-left grid grid-flow-col border-black/70"
												>
													<div class=" mr-2">
														{filteredCategories[0].tags[j].tag_name}
														<div />
														{#if tag_slug === sluglify(filteredCategories[0].tags[j].tag_name)}
															<svg
																xmlns="http://www.w3.org/2000/svg"
																class="h-4 w-4 absolute right-1 top-2"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="2"
																	d="M5 13l4 4L19 7"
																/>
															</svg>
														{/if}
													</div></button
												>
											{:else}
												<button
													on:click={() =>
														goto(
															`/category/${tagToCategory(
																filteredCategories[0].tags[j].tag_id
															)}/${sluglify(filteredCategories[0].tags[j].tag_name)}`
														)}
													on:click={() =>
														(filteredCategories = groupTagsIntoCategories(
															tag_table,
															filteredCategories[0].tags[j].tag_id
														))}
													class="btn-sm relative hover:bg-slate-300 border-[1px] rounded-lg w-full h-full text-left grid grid-flow-col border-black/70"
												>
													{filteredCategories[0].tags[j].tag_name}
												</button>
											{/if}
										</div>
									{/each}
								</div>
							</svelte:fragment>
						</AccordionItem>
						{#each { length: 6 } as _, i}
							<AccordionItem padding="p-1 sm:p-4">
								<svelte:fragment slot="summary">
									{catIdToCatName(filteredCategories[i + 1].category_id)}
								</svelte:fragment>
								<svelte:fragment slot="content">
									<div class=" grid grid-cols-1 md:grid-cols-1 gap-1">
										{#each filteredCategories[i + 1].tags as _, j}
											<div class="flex flex-col">
												{#if tag_slug === sluglify(filteredCategories[i + 1].tags[j].tag_name)}
													<button
														on:click={() =>
															goto(
																`/category/${tagToCategory(
																	filteredCategories[i + 1].tags[j].tag_id
																)}/${sluglify(filteredCategories[i + 1].tags[j].tag_name)}`
															)}
														on:click={() =>
															(filteredCategories = groupTagsIntoCategories(
																tag_table,
																filteredCategories[i + 1].tags[j].tag_id
															))}
														class="btn-sm relative bg-yellow-300 border-[1px] rounded-lg w-full h-full text-left grid grid-flow-col border-black/70"
													>
														<div class=" mr-2">
															{filteredCategories[i + 1].tags[j].tag_name}
															<div />
															<svg
																xmlns="http://www.w3.org/2000/svg"
																class="h-4 w-4 absolute right-1 top-2"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="2"
																	d="M5 13l4 4L19 7"
																/>
															</svg>
														</div></button
													>
												{:else}
													<button
														on:click={() =>
															goto(
																`/category/${tagToCategory(
																	filteredCategories[i + 1].tags[j].tag_id
																)}/${sluglify(filteredCategories[i + 1].tags[j].tag_name)}`
															)}
														on:click={() =>
															(filteredCategories = groupTagsIntoCategories(
																tag_table,
																filteredCategories[i + 1].tags[j].tag_id
															))}
														class="btn-sm relative hover:bg-slate-300 border-[1px] rounded-lg w-full h-full text-left grid grid-flow-col border-black/70"
													>
														{filteredCategories[i + 1].tags[j].tag_name}
													</button>
												{/if}
											</div>
										{/each}
									</div>
								</svelte:fragment>
							</AccordionItem>
						{/each}
					</Accordion>
				</div>
			</div>
		{/if}

		<div>
			{#each slugFiltered as _, i}
				<div class="card mb-4 p-1 md:p-8 relative">
					{#if toggle && i === 0}
						<button
							class="absolute rounded-full hover:ring-2 ring-black z-20"
							on:click={() => toggleFilter()}
							><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01"
								/></svg
							></button
						>
					{/if}

					<div class="w-full text-center text-2xl lg:text-3xl xl:text-4xl pb-8">
						{slugFiltered[i].tag_name}
					</div>
					{#if data}
						<div
							class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2"
						>
							{#each slugFiltered[i].product_table || [] as _, j}
								<div id="product-image" class=" max-w-full rounded-lg relative card parent-hover">
									<div id="images" class="flex h-full justify-center fade-in">
										<Image
											class="fade-in rounded-t-md rounded-b-sm"
											src={slugFiltered[i].product_table[j].product_screenshot}
											layout="constrained"
											priority="true"
											width={1000}
											height={500}
											background={placeholder}
											alt={slugFiltered[i].product_table[j].product_screenshot_alt}
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
												<h1
													class="text-xl sm:text-2xl md:text-2xl lg:text-3xl text-center sm:text-center"
												>
													<div class="flex justify-center">
														{slugFiltered[i].product_table[j].product_name || 'Product Name'}
														{#if slugFiltered[i].product_table[j].product_logo}
															<Image
																class="ml-4 fade-in rounded-full "
																src={slugFiltered[i].product_table[j].product_logo}
																priority="true"
																width={32}
																height={32}
																background={placeholder}
																alt={slugFiltered[i].product_table[j].product_logo_alt}
															/>
														{:else}
															<div />
														{/if}
													</div>
												</h1>

												<!-- !Product Rating -->

												<Ratings
													value={Math.round(
														((+slugFiltered[i].product_table[j].product_rating || 0) / 20) * 2
													) / 2}
													max={5}
												>
													<svelte:fragment slot="empty"><Stars type="empty" /></svelte:fragment>
													<svelte:fragment slot="half"><Stars type="half" /></svelte:fragment>
													<svelte:fragment slot="full"><Stars type="full" /></svelte:fragment>
												</Ratings>
												<!-- <p class=" text-center text-sm opacity-80 text-ellipsis overflow-hidden">
											{slugFiltered[i].product_table[j].product_description}
										</p> -->
											</div>
										</div>

										<div
											class="absolute w-full top-1/2 left-1/2 ml-[-75px] lg:ml-[-100px] xl:ml-[-150px] mt-[-40px] h-full"
										>
											<div class="grid grid-cols-1 gap-1">
												<button
													on:click={() => {
														goto(
															`/product/${sluglify(slugFiltered[i].product_table[j].product_name)}`
														);
													}}
													class="parent-hover overlay-show btn variant-ghost-primary w-[150px] lg:w-[200px] xl:w-[300px] h-[40px] text-white text-base text-md md:text-xl lg:text-2xl z-30 opacity-0"
												>
													<span>Review</span><Linkicon />
												</button>
												<button
													on:click={() => {
														window.open(slugFiltered[i].product_table[j].product_url, '_self');
													}}
													class="parent-hover overlay-show btn variant-ghost-primary w-[150px] lg:w-[200px] xl:w-[300px] h-[40px] text-white text-base text-md md:text-xl lg:text-2xl z-30 opacity-0"
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
				</div>
			{/each}
		</div>
	</div>
{/if}
