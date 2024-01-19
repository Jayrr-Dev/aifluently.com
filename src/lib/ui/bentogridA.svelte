<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { popup, Ratings } from '@skeletonlabs/skeleton';
	import { supabase } from '$lib/supabaseClient';
	import { fade } from 'svelte/transition';
	import { tagsState } from '../../stores/tagsStore';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { lighttoggle } from '../../stores/store';
	type ProductDetail = {
		name: string;
		logo: string;
		rating: number;
		description: string;
		url: string;
		logoAlt: string;
	};

	type TagWithProducts = {
		tagName: string;
		productNames: string[];
		productDetails: ProductDetail[];
	};

	interface CacheItem<T> {
		data: T;
		expiry: number;
	}
	let tagsLoaded = false;
	let tags: string[] = [];
	let tagProductDetails: ProductDetail[][] = [
		[{ name: '', logo: '', rating: 0, description: '', url: '', logoAlt: '' }]
	];
	const cache: Record<string, CacheItem<any>> = {};
	let windowWidth = 0;

	// Subscribe to the store
	let state: any;
	tagsState.subscribe(($state) => {
		state = $state;
	});

	onMount(() => {
		fetchData(); // Call the async function
		updateWidth();
		setTimeout(() => {
			showTag = true;
		}, 100);
		window.addEventListener('resize', updateWidth);

		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	});
	//lightswitch logic
	$: lightswitch = $lighttoggle;

	async function fetchData() {
		let shouldFetch = false;

		// Check if the data has already been fetched
		tagsState.subscribe(($state) => {
			shouldFetch = !$state.fetched;
		});

		if (!shouldFetch) return;

		try {
			const tagsWithProducts = await fetchAllTagsWithProducts(1);
			updateTagData(tagsWithProducts);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
	// Fetches all tags and their corresponding product names
	async function fetchAllTagsWithProducts(categoryId: number): Promise<TagWithProducts[]> {
		// Cache key based on category ID
		const cacheKey = `tagsWithProducts-${categoryId}`;
		const cachedData = getFromCache(cacheKey);
		if (cachedData) return cachedData;

		const { data: tagsData, error: tagsError } = await supabase
			.from('tag_table')
			.select('tag_id, tag_name')
			.eq('category_id', categoryId);

		if (tagsError) {
			console.error(tagsError);
			return [];
		}

		if (!tagsData || tagsData.length === 0) {
			return [];
		}

		const tagsWithProducts = await Promise.all(
			tagsData.map(async (tag) => {
				const productIds = await getProduct(tag.tag_id);
				const productNames = await getProductName(productIds);
				const productDetails = await getProductDetails(productIds);
				return { tagName: tag.tag_name, productNames, productDetails };
			})
		);

		addToCache(cacheKey, tagsWithProducts, 3600000); // Cache for 1 hour
		return tagsWithProducts;
	}
	// Fetch product_id using the junction_product_tag filter by tag_id
	async function getProduct(tagId: number): Promise<number[]> {
		const cacheKey = `productIds-${tagId}`;
		const cachedData = getFromCache(cacheKey);
		if (cachedData) return cachedData;

		const { data, error } = await supabase
			.from('junction_product_tag')
			.select('product_id')
			.eq('tag_id', tagId)
			.order('product_id', { ascending: true });

		if (error) {
			console.error(error);
			return [];
		}

		const productIds = data ? data.map((item) => item.product_id) : [];
		addToCache(cacheKey, productIds, 3600000); // Cache for 1 hour
		return productIds;
	}

	async function getProductName(productIds: number[]): Promise<string[]> {
		// Cache key based on concatenated product IDs
		const cacheKey = `productNames-${productIds.join('-')}`;
		const cachedData = getFromCache(cacheKey);
		if (cachedData) return cachedData;

		if (productIds.length === 0) {
			return []; // Return an empty array if there are no product IDs
		}

		const { data, error } = await supabase
			.from('product_table')
			.select('product_name')
			.in('product_id', productIds)
			.order('product_name', { ascending: true });

		if (error) {
			console.error(error);
			return [];
		}

		const productNames = data ? data.map((product) => product.product_name) : [];
		addToCache(cacheKey, productNames, 3600000); // Cache for 1 hour
		return productNames;
	}
	async function getProductDetails(productIds: number[]): Promise<ProductDetail[]> {
		// Cache key based on concatenated product IDs
		const cacheKey = `productDetails-${productIds.join('-')}`;
		const cachedData = getFromCache(cacheKey);
		if (cachedData) return cachedData;

		if (productIds.length === 0) {
			return [];
		}

		const { data, error } = await supabase
			.from('product_table')
			.select(
				'product_name, product_logo, product_rating, product_description, product_url, product_logo_alt'
			)
			.in('product_id', productIds)
			.order('product_rating', { ascending: true });

		if (error) {
			console.error(error);
			return [];
		}

		const productDetails = data
			? data.map((product) => ({
					name: product.product_name,
					logo: product.product_logo,
					rating: product.product_rating,
					description: product.product_description,
					url: product.product_url,
					logoAlt: product.product_logo_alt
				}))
			: [];

		addToCache(cacheKey, productDetails, 3600000); // Cache for 1 hour
		return productDetails;
	}

	function updateWidth() {
		windowWidth = window.innerWidth;
	}

	function updateTagData(tagsWithProducts: TagWithProducts[]) {
		const newTags = tagsWithProducts.map((tag) => tag.tagName);
		const newTagProductDetails = tagsWithProducts.map((tag) => tag.productDetails);

		// Update the store
		tagsState.update((state) => {
			return {
				...state,
				tags: newTags,
				tagProductDetails: newTagProductDetails,
				tagsLoaded: true,
				fetched: true // Set fetched to true
			};
		});
	}

	// Function to retrieve data from cache
	function getFromCache(key: string) {
		const item = cache[key];
		if (item && item.expiry > Date.now()) {
			return item.data;
		}
		return null; // Return null if data is not in cache or is expired
	}

	// Function to add data to cache
	function addToCache(key: string, data: any, ttl: number) {
		cache[key] = {
			data,
			expiry: Date.now() + ttl
		};
	}

	//Icon Mapping
	function getIconForTag(tagId: number): string {
		const iconMapping: { [key: number]: string } = {
			0: 'quill:chat',
			1: 'akar-icons:image'
		};
		return iconMapping[tagId] || 'default-icon'; // 'default-icon' is a fallback
	}
	let isVisible = false;
	let showTag = false;

	//special

	let category0: number = 0;
	let category1: number = 1;
	let category2: number = 2;
	let categoty4: number = 3;
	let category5: number = 4;
	let category6: number = 5;
	let category7: number = 6;
</script>

<section
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 m-10 lg:mx-32 xl:mx-32"
>
	<!-- row 1 -->
	<div class="h-full parent-element">
		<div class="card h-[800px] grid grid-cols-1 relative card-hover">
			<header class="card-header text-center pr-6">
				{#if state.tags[category0] && showTag}
					<div in:fade={{ duration: 800 }}>
						<span class="badge text-4xl p-0 m-0 translate-y-2">
							<Icon icon={getIconForTag(category0)} />
						</span>
						<span class="text-2xl font-bold uppercase">
							{state.tags[category0]}
						</span>
					</div>
				{:else}
					<span class="text-4xl animate-pulse">ㅤ</span>
				{/if}
			</header>
			<ProgressBar animIndeterminate="anim-progress-bar" rounded="false" height="h-1" />
			<div class="h-[670px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500">
				{#if showTag}
					<!-- 1 -->

					<div in:fade={{ duration: 800 }}>
						<div class="flex justify-start">
							<section class="p-4 w-full">
								<ol>
									{#each state.tagProductDetails[category0] as product, i}
										<!-- ? Tooltip Styles -->
										<div
											class="card p-4 z-10 variant-filled-secondary w-[90%] sm:w-[90%] lg:w-[90%] h-40 lg:h-36"
											data-popup={'popupHover' + category0 + '-' + i}
										>
											<div class="grid justify-center">
												<div class="flex">
													<span class="p-1">
														<!-- !Product Logo -->
														{#if product.logo}
															<img
																class="rounded-full h-5 w-5 object-cover"
																src={product.logo}
																alt="AI FLUENTLY logo"
															/>
														{:else}
															<!-- <img
													class="rounded-full h-5 w-5 object-cover"
													src="/assets/logo/logomark-black-circle.svg"
													alt="AI FLUENTLY logo"
												/> -->
														{/if}
													</span>
													<span
														class="font-bold flex-auto [&>*]:pointer-events-none"
														use:popup={{
															event: 'hover',
															target: 'popupHover' + category0 + '-' + i,
															placement: 'top'
														}}
													>
														<!-- !Product Name -->
														{product.name}
													</span>
												</div>
											</div>
											<div>
												<!-- !Product Rating -->

												<Ratings value={Math.round((product.rating / 20) * 2) / 2} max={5}>
													<svelte:fragment slot="empty"
														><Icon icon="line-md:star-alt-twotone" color="gray" /></svelte:fragment
													>
													<svelte:fragment slot="half"
														><Icon icon="line-md:star-filled-half" color="gold" />
													</svelte:fragment>
													<svelte:fragment slot="full"
														><Icon icon="line-md:star-filled" color="gold" /></svelte:fragment
													>
												</Ratings>
											</div>
											<p class="p-1 text-sm opacity-80 text-ellipsis overflow-hidden h-16">
												<!-- !Product Description -->
												{#if product.description}
													{product.description}
												{:else}
													<!--  -->
												{/if}
											</p>
											{#if windowWidth < 768}
												<!-- Product Review Button for Mobile -->
												<!-- URL REFERENCE -->
												<a href={product.name.replace(/\s/g, '')}>
													<div class="flex justify-center">
														<button
															class="btn btn-sm w-[50%] bg-warning-500 border-2 border-black h-6"
														>
															Learn More
														</button>
													</div>
												</a>
											{/if}
											<div class="arrow variant-filled-secondary" />
										</div>
										<!-- ? Links -->
										{#if windowWidth <= 768}
											<!-- !Mobile-->
											<ol class="flex justify-between">
												<button
													class="[&>*]:pointer-events-none min-w-[80%] group/item"
													use:popup={{
														event: 'click',
														target: 'popupHover' + category0 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full min-w-[66%]">
														<div class="mt-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-3">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>
														<div
															class="pt-1 group-hover/item:underline group-active/item:underline"
														>
															<!-- !Product Name Mobile-->
															{product.name}
														</div>
													</div>
												</button>
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-3xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
												<!-- !Link to Site -->
											</ol>
										{:else}
											<!-- !Desktop-->
											<ol class="flex justify-between py-1">
												<a
													href={product.name.replace(/\s/g, '')}
													class=" min-w-[70%] group/item"
													use:popup={{
														event: 'hover',
														target: 'popupHover' + category0 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full">
														<div class="p-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-2">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>

														<!-- !URL REFERENCE -->

														<div
															id="product_name"
															class="p-1 flex-auto group-hover/item:underline [&>*]:pointer-events-none"
														>
															<!-- !Product Name + Review Link Desktop -->
															{product.name}
														</div>
													</div>
												</a>
												<!-- !Link to Site -->
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-2xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
											</ol>
										{/if}
									{/each}
								</ol>
							</section>
						</div>
					</div>
				{/if}
			</div>
			{#if lightswitch}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-800 to-surface-800/0"
				></div>
			{:else}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-50 to-white/0"
				></div>
			{/if}
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-8 bg-warning-500 border-2 border-black"> More </button>
			</div>
		</div>
	</div>

	<!-- row 2 -->
	<div class="h-full grid gap-2">
		<div class="card h-[290px] grid grid-cols-1 relative card-hover parent-element">
			<!-- 2 -->
			<header class="card-header text-center pr-6">
				{#if state.tags[category1] && showTag}
					<div in:fade={{ duration: 800 }}>
						<span class="badge text-4xl p-0 m-0 translate-y-2">
							<Icon icon={getIconForTag(category1)} />
						</span>
						<span class="text-2xl font-bold uppercase">
							{state.tags[category1]}
						</span>
					</div>
				{:else}
					<span class="text-4xl animate-pulse">ㅤ</span>
				{/if}
			</header>
			<ProgressBar animIndeterminate="anim-progress-bar" rounded="false" height="h-1" />
			<div class="h-[160px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500">
				{#if showTag}
					<!-- 1 -->

					<div in:fade={{ duration: 800 }}>
						<div class="flex justify-start">
							<section class="p-4 w-full">
								<ol>
									{#each state.tagProductDetails[category1] as product, i}
										<!-- ? Tooltip Styles -->
										<div
											class="card p-4 z-10 variant-filled-secondary w-[90%] sm:w-[90%] lg:w-[90%] h-40 lg:h-36"
											data-popup={'popupHover' + category1 + '-' + i}
										>
											<div class="grid justify-center">
												<div class="flex">
													<span class="p-1">
														<!-- !Product Logo -->
														{#if product.logo}
															<img
																class="rounded-full h-5 w-5 object-cover"
																src={product.logo}
																alt="AI FLUENTLY logo"
															/>
														{:else}
															<!-- <img
													class="rounded-full h-5 w-5 object-cover"
													src="/assets/logo/logomark-black-circle.svg"
													alt="AI FLUENTLY logo"
												/> -->
														{/if}
													</span>
													<span
														class="font-bold flex-auto [&>*]:pointer-events-none"
														use:popup={{
															event: 'hover',
															target: 'popupHover' + category1 + '-' + i,
															placement: 'top'
														}}
													>
														<!-- !Product Name -->
														{product.name}
													</span>
												</div>
											</div>
											<div>
												<!-- !Product Rating -->

												<Ratings value={Math.round((product.rating / 20) * 2) / 2} max={5}>
													<svelte:fragment slot="empty"
														><Icon icon="line-md:star-alt-twotone" color="gray" /></svelte:fragment
													>
													<svelte:fragment slot="half"
														><Icon icon="line-md:star-filled-half" color="gold" />
													</svelte:fragment>
													<svelte:fragment slot="full"
														><Icon icon="line-md:star-filled" color="gold" /></svelte:fragment
													>
												</Ratings>
											</div>
											<p class="p-1 text-sm opacity-80 text-ellipsis overflow-hidden h-16">
												<!-- !Product Description -->
												{#if product.description}
													{product.description}
												{:else}
													<!--  -->
												{/if}
											</p>
											{#if windowWidth < 768}
												<!-- Product Review Button for Mobile -->
												<!-- URL REFERENCE -->
												<a href={product.name.replace(/\s/g, '')}>
													<div class="flex justify-center">
														<button
															class="btn btn-sm w-[50%] bg-warning-500 border-2 border-black h-6"
														>
															Learn More
														</button>
													</div>
												</a>
											{/if}
											<div class="arrow variant-filled-secondary" />
										</div>
										<!-- ? Links -->
										{#if windowWidth <= 768}
											<!-- !Mobile-->
											<ol class="flex justify-between">
												<button
													class="[&>*]:pointer-events-none min-w-[80%] group/item"
													use:popup={{
														event: 'click',
														target: 'popupHover' + category1 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full min-w-[66%]">
														<div class="mt-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-3">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>
														<div
															class="pt-1 group-hover/item:underline group-active/item:underline"
														>
															<!-- !Product Name Mobile-->
															{product.name}
														</div>
													</div>
												</button>
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-3xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
												<!-- !Link to Site -->
											</ol>
										{:else}
											<!-- !Desktop-->
											<ol class="flex justify-between py-1">
												<a
													href={product.name.replace(/\s/g, '')}
													class=" min-w-[70%] group/item"
													use:popup={{
														event: 'hover',
														target: 'popupHover' + category1 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full">
														<div class="p-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-2">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>

														<!-- !URL REFERENCE -->

														<div
															id="product_name"
															class="p-1 flex-auto group-hover/item:underline [&>*]:pointer-events-none"
														>
															<!-- !Product Name + Review Link Desktop -->
															{product.name}
														</div>
													</div>
												</a>
												<!-- !Link to Site -->
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-2xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
											</ol>
										{/if}
									{/each}
								</ol>
							</section>
						</div>
					</div>
				{/if}
			</div>

			{#if lightswitch}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-800 to-surface-800/0"
				></div>
			{:else}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-50 to-white/0"
				></div>
			{/if}

			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-8 bg-warning-500 border-2 border-black"> More </button>
			</div>
		</div>

		<div class="card h-[500px] grid grid-cols-1 relative card-hover parent-element">
			<!-- 3 -->
			<header class="card-header text-center pr-6">
				{#if state.tags[category1] && showTag}
					<div in:fade={{ duration: 800 }}>
						<span class="badge text-4xl p-0 m-0 translate-y-2">
							<Icon icon={getIconForTag(category1)} />
						</span>
						<span class="text-2xl font-bold uppercase">
							{state.tags[category1]}
						</span>
					</div>
				{:else}
					<span class="text-4xl animate-pulse">ㅤ</span>
				{/if}
			</header>
			<ProgressBar animIndeterminate="anim-progress-bar" rounded="false" height="h-1" />
			<div class="h-[370px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500">
				{#if showTag}
					<!-- 1 -->

					<div in:fade={{ duration: 800 }}>
						<div class="flex justify-start">
							<section class="p-4 w-full">
								<ol>
									{#each state.tagProductDetails[category1] as product, i}
										<!-- ? Tooltip Styles -->
										<div
											class="card p-4 z-10 variant-filled-secondary w-[90%] sm:w-[90%] lg:w-[90%] h-40 lg:h-36"
											data-popup={'popupHover' + category1 + '-' + i}
										>
											<div class="grid justify-center">
												<div class="flex">
													<span class="p-1">
														<!-- !Product Logo -->
														{#if product.logo}
															<img
																class="rounded-full h-5 w-5 object-cover"
																src={product.logo}
																alt="AI FLUENTLY logo"
															/>
														{:else}
															<!-- <img
													class="rounded-full h-5 w-5 object-cover"
													src="/assets/logo/logomark-black-circle.svg"
													alt="AI FLUENTLY logo"
												/> -->
														{/if}
													</span>
													<span
														class="font-bold flex-auto [&>*]:pointer-events-none"
														use:popup={{
															event: 'hover',
															target: 'popupHover' + category1 + '-' + i,
															placement: 'top'
														}}
													>
														<!-- !Product Name -->
														{product.name}
													</span>
												</div>
											</div>
											<div>
												<!-- !Product Rating -->

												<Ratings value={Math.round((product.rating / 20) * 2) / 2} max={5}>
													<svelte:fragment slot="empty"
														><Icon icon="line-md:star-alt-twotone" color="gray" /></svelte:fragment
													>
													<svelte:fragment slot="half"
														><Icon icon="line-md:star-filled-half" color="gold" />
													</svelte:fragment>
													<svelte:fragment slot="full"
														><Icon icon="line-md:star-filled" color="gold" /></svelte:fragment
													>
												</Ratings>
											</div>
											<p class="p-1 text-sm opacity-80 text-ellipsis overflow-hidden h-16">
												<!-- !Product Description -->
												{#if product.description}
													{product.description}
												{:else}
													<!--  -->
												{/if}
											</p>
											{#if windowWidth < 768}
												<!-- Product Review Button for Mobile -->
												<!-- URL REFERENCE -->
												<a href={product.name.replace(/\s/g, '')}>
													<div class="flex justify-center">
														<button
															class="btn btn-sm w-[50%] bg-warning-500 border-2 border-black h-6"
														>
															Learn More
														</button>
													</div>
												</a>
											{/if}
											<div class="arrow variant-filled-secondary" />
										</div>
										<!-- ? Links -->
										{#if windowWidth <= 768}
											<!-- !Mobile-->
											<ol class="flex justify-between">
												<button
													class="[&>*]:pointer-events-none min-w-[80%] group/item"
													use:popup={{
														event: 'click',
														target: 'popupHover' + category1 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full min-w-[66%]">
														<div class="mt-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-3">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>
														<div
															class="pt-1 group-hover/item:underline group-active/item:underline"
														>
															<!-- !Product Name Mobile-->
															{product.name}
														</div>
													</div>
												</button>
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-3xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
												<!-- !Link to Site -->
											</ol>
										{:else}
											<!-- !Desktop-->
											<ol class="flex justify-between py-1">
												<a
													href={product.name.replace(/\s/g, '')}
													class=" min-w-[70%] group/item"
													use:popup={{
														event: 'hover',
														target: 'popupHover' + category1 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full">
														<div class="p-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-2">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>

														<!-- !URL REFERENCE -->

														<div
															id="product_name"
															class="p-1 flex-auto group-hover/item:underline [&>*]:pointer-events-none"
														>
															<!-- !Product Name + Review Link Desktop -->
															{product.name}
														</div>
													</div>
												</a>
												<!-- !Link to Site -->
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-2xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
											</ol>
										{/if}
									{/each}
								</ol>
							</section>
						</div>
					</div>
				{/if}
			</div>

			{#if lightswitch}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-800 to-surface-800/0"
				></div>
			{:else}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-50 to-white/0"
				></div>
			{/if}

			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-8 bg-warning-500 border-2 border-black"> More </button>
			</div>
		</div>
	</div>

	<!-- row 3 -->
	<div class="h-full grid gap-2">
		<div class="card h-[500px] relative grid grid-cols-1 card-hover parent-element">
			<!-- 4 -->
			<header class="card-header text-center pr-6">
				{#if state.tags[category1] && showTag}
					<div in:fade={{ duration: 800 }}>
						<span class="badge text-4xl p-0 m-0 translate-y-2">
							<Icon icon={getIconForTag(category1)} />
						</span>
						<span class="text-2xl font-bold uppercase">
							{state.tags[category1]}
						</span>
					</div>
				{:else}
					<span class="text-4xl animate-pulse">ㅤ</span>
				{/if}
			</header>
			<ProgressBar animIndeterminate="anim-progress-bar" rounded="false" height="h-1" />
			<div class="h-[370px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500">
				{#if showTag}
					<!-- 1 -->

					<div in:fade={{ duration: 800 }}>
						<div class="flex justify-start">
							<section class="p-4 w-full">
								<ol>
									{#each state.tagProductDetails[category1] as product, i}
										<!-- ? Tooltip Styles -->
										<div
											class="card p-4 z-10 variant-filled-secondary w-[90%] sm:w-[90%] lg:w-[90%] h-40 lg:h-36"
											data-popup={'popupHover' + category1 + '-' + i}
										>
											<div class="grid justify-center">
												<div class="flex">
													<span class="p-1">
														<!-- !Product Logo -->
														{#if product.logo}
															<img
																class="rounded-full h-5 w-5 object-cover"
																src={product.logo}
																alt="AI FLUENTLY logo"
															/>
														{:else}
															<!-- <img
													class="rounded-full h-5 w-5 object-cover"
													src="/assets/logo/logomark-black-circle.svg"
													alt="AI FLUENTLY logo"
												/> -->
														{/if}
													</span>
													<span
														class="font-bold flex-auto [&>*]:pointer-events-none"
														use:popup={{
															event: 'hover',
															target: 'popupHover' + category1 + '-' + i,
															placement: 'top'
														}}
													>
														<!-- !Product Name -->
														{product.name}
													</span>
												</div>
											</div>
											<div>
												<!-- !Product Rating -->

												<Ratings value={Math.round((product.rating / 20) * 2) / 2} max={5}>
													<svelte:fragment slot="empty"
														><Icon icon="line-md:star-alt-twotone" color="gray" /></svelte:fragment
													>
													<svelte:fragment slot="half"
														><Icon icon="line-md:star-filled-half" color="gold" />
													</svelte:fragment>
													<svelte:fragment slot="full"
														><Icon icon="line-md:star-filled" color="gold" /></svelte:fragment
													>
												</Ratings>
											</div>
											<p class="p-1 text-sm opacity-80 text-ellipsis overflow-hidden h-16">
												<!-- !Product Description -->
												{#if product.description}
													{product.description}
												{:else}
													<!--  -->
												{/if}
											</p>
											{#if windowWidth < 768}
												<!-- Product Review Button for Mobile -->
												<!-- URL REFERENCE -->
												<a href={product.name.replace(/\s/g, '')}>
													<div class="flex justify-center">
														<button
															class="btn btn-sm w-[50%] bg-warning-500 border-2 border-black h-6"
														>
															Learn More
														</button>
													</div>
												</a>
											{/if}
											<div class="arrow variant-filled-secondary" />
										</div>
										<!-- ? Links -->
										{#if windowWidth <= 768}
											<!-- !Mobile-->
											<ol class="flex justify-between">
												<button
													class="[&>*]:pointer-events-none min-w-[80%] group/item"
													use:popup={{
														event: 'click',
														target: 'popupHover' + category1 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full min-w-[66%]">
														<div class="mt-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-3">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>
														<div
															class="pt-1 group-hover/item:underline group-active/item:underline"
														>
															<!-- !Product Name Mobile-->
															{product.name}
														</div>
													</div>
												</button>
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-3xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
												<!-- !Link to Site -->
											</ol>
										{:else}
											<!-- !Desktop-->
											<ol class="flex justify-between py-1">
												<a
													href={product.name.replace(/\s/g, '')}
													class=" min-w-[70%] group/item"
													use:popup={{
														event: 'hover',
														target: 'popupHover' + category1 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full">
														<div class="p-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-2">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>

														<!-- !URL REFERENCE -->

														<div
															id="product_name"
															class="p-1 flex-auto group-hover/item:underline [&>*]:pointer-events-none"
														>
															<!-- !Product Name + Review Link Desktop -->
															{product.name}
														</div>
													</div>
												</a>
												<!-- !Link to Site -->
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-2xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
											</ol>
										{/if}
									{/each}
								</ol>
							</section>
						</div>
					</div>
				{/if}
			</div>

			{#if lightswitch}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-800 to-surface-800/0"
				></div>
			{:else}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-50 to-white/0"
				></div>
			{/if}

			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-8 bg-warning-500 border-2 border-black"> More </button>
			</div>
		</div>
		<div class="card h-[290px] relative grid grid-cols-1 card-hover parent-element">
			<!-- 5 -->
			<header class="card-header text-center pr-6">
				{#if state.tags[category1] && showTag}
					<div in:fade={{ duration: 800 }}>
						<span class="badge text-4xl p-0 m-0 translate-y-2">
							<Icon icon={getIconForTag(category1)} />
						</span>
						<span class="text-2xl font-bold uppercase">
							{state.tags[category1]}
						</span>
					</div>
				{:else}
					<span class="text-4xl animate-pulse">ㅤ</span>
				{/if}
			</header>
			<ProgressBar animIndeterminate="anim-progress-bar" rounded="false" height="h-1" />
			<div class="h-[160px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500">
				{#if showTag}
					<!-- 1 -->

					<div in:fade={{ duration: 800 }}>
						<div class="flex justify-start">
							<section class="p-4 w-full">
								<ol>
									{#each state.tagProductDetails[category1] as product, i}
										<!-- ? Tooltip Styles -->
										<div
											class="card p-4 z-10 variant-filled-secondary w-[90%] sm:w-[90%] lg:w-[90%] h-40 lg:h-36"
											data-popup={'popupHover' + category1 + '-' + i}
										>
											<div class="grid justify-center">
												<div class="flex">
													<span class="p-1">
														<!-- !Product Logo -->
														{#if product.logo}
															<img
																class="rounded-full h-5 w-5 object-cover"
																src={product.logo}
																alt="AI FLUENTLY logo"
															/>
														{:else}
															<!-- <img
													class="rounded-full h-5 w-5 object-cover"
													src="/assets/logo/logomark-black-circle.svg"
													alt="AI FLUENTLY logo"
												/> -->
														{/if}
													</span>
													<span
														class="font-bold flex-auto [&>*]:pointer-events-none"
														use:popup={{
															event: 'hover',
															target: 'popupHover' + category1 + '-' + i,
															placement: 'top'
														}}
													>
														<!-- !Product Name -->
														{product.name}
													</span>
												</div>
											</div>
											<div>
												<!-- !Product Rating -->

												<Ratings value={Math.round((product.rating / 20) * 2) / 2} max={5}>
													<svelte:fragment slot="empty"
														><Icon icon="line-md:star-alt-twotone" color="gray" /></svelte:fragment
													>
													<svelte:fragment slot="half"
														><Icon icon="line-md:star-filled-half" color="gold" />
													</svelte:fragment>
													<svelte:fragment slot="full"
														><Icon icon="line-md:star-filled" color="gold" /></svelte:fragment
													>
												</Ratings>
											</div>
											<p class="p-1 text-sm opacity-80 text-ellipsis overflow-hidden h-16">
												<!-- !Product Description -->
												{#if product.description}
													{product.description}
												{:else}
													<!--  -->
												{/if}
											</p>
											{#if windowWidth < 768}
												<!-- Product Review Button for Mobile -->
												<!-- URL REFERENCE -->
												<a href={product.name.replace(/\s/g, '')}>
													<div class="flex justify-center">
														<button
															class="btn btn-sm w-[50%] bg-warning-500 border-2 border-black h-6"
														>
															Learn More
														</button>
													</div>
												</a>
											{/if}
											<div class="arrow variant-filled-secondary" />
										</div>
										<!-- ? Links -->
										{#if windowWidth <= 768}
											<!-- !Mobile-->
											<ol class="flex justify-between">
												<button
													class="[&>*]:pointer-events-none min-w-[80%] group/item"
													use:popup={{
														event: 'click',
														target: 'popupHover' + category1 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full min-w-[66%]">
														<div class="mt-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-3">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>
														<div
															class="pt-1 group-hover/item:underline group-active/item:underline"
														>
															<!-- !Product Name Mobile-->
															{product.name}
														</div>
													</div>
												</button>
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-3xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
												<!-- !Link to Site -->
											</ol>
										{:else}
											<!-- !Desktop-->
											<ol class="flex justify-between py-1">
												<a
													href={product.name.replace(/\s/g, '')}
													class=" min-w-[70%] group/item"
													use:popup={{
														event: 'hover',
														target: 'popupHover' + category1 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full">
														<div class="p-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-2">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>

														<!-- !URL REFERENCE -->

														<div
															id="product_name"
															class="p-1 flex-auto group-hover/item:underline [&>*]:pointer-events-none"
														>
															<!-- !Product Name + Review Link Desktop -->
															{product.name}
														</div>
													</div>
												</a>
												<!-- !Link to Site -->
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-2xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
											</ol>
										{/if}
									{/each}
								</ol>
							</section>
						</div>
					</div>
				{/if}
			</div>

			{#if lightswitch}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-800 to-surface-800/0"
				></div>
			{:else}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-50 to-white/0"
				></div>
			{/if}

			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-8 bg-warning-500 border-2 border-black"> More </button>
			</div>
		</div>
	</div>

	<!-- row 4 -->
	<div class="h-full parent-element">
		<div class="card h-[800px] grid grid-cols-1 relative card-hover">
			<header class="card-header text-center pr-6">
				{#if state.tags[category0] && showTag}
					<div in:fade={{ duration: 800 }}>
						<span class="badge text-4xl p-0 m-0 translate-y-2">
							<Icon icon={getIconForTag(category0)} />
						</span>
						<span class="text-2xl font-bold uppercase">
							{state.tags[category0]}
						</span>
					</div>
				{:else}
					<span class="text-4xl animate-pulse">ㅤ</span>
				{/if}
			</header>
			<ProgressBar animIndeterminate="anim-progress-bar" rounded="false" height="h-1" />
			<div class="h-[670px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500">
				{#if showTag}
					<!-- 1 -->

					<div in:fade={{ duration: 800 }}>
						<div class="flex justify-start">
							<section class="p-4 w-full">
								<ol>
									{#each state.tagProductDetails[category0] as product, i}
										<!-- ? Tooltip Styles -->
										<div
											class="card p-4 z-10 variant-filled-secondary w-[90%] sm:w-[90%] lg:w-[90%] h-40 lg:h-36"
											data-popup={'popupHover' + category0 + '-' + i}
										>
											<div class="grid justify-center">
												<div class="flex">
													<span class="p-1">
														<!-- !Product Logo -->
														{#if product.logo}
															<img
																class="rounded-full h-5 w-5 object-cover"
																src={product.logo}
																alt="AI FLUENTLY logo"
															/>
														{:else}
															<!-- <img
													class="rounded-full h-5 w-5 object-cover"
													src="/assets/logo/logomark-black-circle.svg"
													alt="AI FLUENTLY logo"
												/> -->
														{/if}
													</span>
													<span
														class="font-bold flex-auto [&>*]:pointer-events-none"
														use:popup={{
															event: 'hover',
															target: 'popupHover' + category0 + '-' + i,
															placement: 'top'
														}}
													>
														<!-- !Product Name -->
														{product.name}
													</span>
												</div>
											</div>
											<div>
												<!-- !Product Rating -->

												<Ratings value={Math.round((product.rating / 20) * 2) / 2} max={5}>
													<svelte:fragment slot="empty"
														><Icon icon="line-md:star-alt-twotone" color="gray" /></svelte:fragment
													>
													<svelte:fragment slot="half"
														><Icon icon="line-md:star-filled-half" color="gold" />
													</svelte:fragment>
													<svelte:fragment slot="full"
														><Icon icon="line-md:star-filled" color="gold" /></svelte:fragment
													>
												</Ratings>
											</div>
											<p class="p-1 text-sm opacity-80 text-ellipsis overflow-hidden h-16">
												<!-- !Product Description -->
												{#if product.description}
													{product.description}
												{:else}
													<!--  -->
												{/if}
											</p>
											{#if windowWidth < 768}
												<!-- Product Review Button for Mobile -->
												<!-- URL REFERENCE -->
												<a href={product.name.replace(/\s/g, '')}>
													<div class="flex justify-center">
														<button
															class="btn btn-sm w-[50%] bg-warning-500 border-2 border-black h-6"
														>
															Learn More
														</button>
													</div>
												</a>
											{/if}
											<div class="arrow variant-filled-secondary" />
										</div>
										<!-- ? Links -->
										{#if windowWidth <= 768}
											<!-- !Mobile-->
											<ol class="flex justify-between">
												<button
													class="[&>*]:pointer-events-none min-w-[80%] group/item"
													use:popup={{
														event: 'click',
														target: 'popupHover' + category0 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full min-w-[66%]">
														<div class="mt-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-3">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>
														<div
															class="pt-1 group-hover/item:underline group-active/item:underline"
														>
															<!-- !Product Name Mobile-->
															{product.name}
														</div>
													</div>
												</button>
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-3xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
												<!-- !Link to Site -->
											</ol>
										{:else}
											<!-- !Desktop-->
											<ol class="flex justify-between py-1">
												<a
													href={product.name.replace(/\s/g, '')}
													class=" min-w-[70%] group/item"
													use:popup={{
														event: 'hover',
														target: 'popupHover' + category0 + '-' + i,
														placement: 'top'
													}}
												>
													<div class="flex w-full">
														<div class="p-1">
															<!-- !Number Order -->
															{i + 1}.
														</div>
														<div class="px-2">
															<!-- !Logo -->
															{#if product.logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={product.logo}
																	alt="AI FLUENTLY logo"
																/>
															{:else}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src="/assets/logo/logomark-black-circle.svg"
																	alt="AI FLUENTLY logo"
																/>
															{/if}
														</div>

														<!-- !URL REFERENCE -->

														<div
															id="product_name"
															class="p-1 flex-auto group-hover/item:underline [&>*]:pointer-events-none"
														>
															<!-- !Product Name + Review Link Desktop -->
															{product.name}
														</div>
													</div>
												</a>
												<!-- !Link to Site -->
												<a
													href={product.url}
													target="_blank"
													class="flex opacity-50 hover:opacity-100 text-2xl p-1"
												>
													<Icon icon="system-uicons:jump-up" />
												</a>
											</ol>
										{/if}
									{/each}
								</ol>
							</section>
						</div>
					</div>
				{/if}
			</div>
			{#if lightswitch}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-800 to-surface-800/0"
				></div>
			{:else}
				<div
					class=" h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-50 to-white/0"
				></div>
			{/if}
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-8 bg-warning-500 border-2 border-black"> More </button>
			</div>
		</div>
	</div>
</section>
