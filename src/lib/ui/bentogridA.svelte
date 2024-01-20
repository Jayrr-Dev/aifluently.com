<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { popup, Ratings } from '@skeletonlabs/skeleton';
	import { supabase } from '$lib/supabaseClient';
	import { fade } from 'svelte/transition';
	import { tagsState } from '../../stores/tagsStore';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { lighttoggle } from '../../stores/store';

	import Card800px from '$lib/ui/card800px.svelte';
	import Card500px from '$lib/ui/card500px.svelte';
	import Card290px from '$lib/ui/card290px.svelte';

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
	// let tagsLoaded = false;
	// let tags: string[] = [];
	// let tagProductDetails: ProductDetail[][] = [
	// 	[{ name: '', logo: '', rating: 0, description: '', url: '', logoAlt: '' }]
	// ];
	const cache: Record<string, CacheItem<any>> = {};
	let windowWidth = 0;

	// Subscribe to the store
	let state: any;

	tagsState.subscribe(($state) => {
		state = $state;
	});

	onMount(() => {
		tagsState.subscribe(($state) => {
			state = $state;
			fetchData(); // Call the async function after state is updated
		});
		// Call the async function
		setTimeout(() => {
			showTag = true;
		}, 100);

		//windowidth
		updateWidth();
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
			.eq('category_id', categoryId)
			.order('tag_id', { ascending: true }) // Order by tag_id ascending
			.order('category_id', { ascending: true }); // Then order by category_id ascending
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

	//Maybe a better way to do this?
	let category0: number = 0;
	let category1: number = 1;
	let category2: number = 2;
	let category3: number = 3;
	let category4: number = 4;
	let category5: number = 5;
	let category6: number = 6;
	let category7: number = 7;
</script>

<section
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 m-10 lg:mx-32 xl:mx-32"
>
	<!-- row 1 -->
	<div class="h-full parent-element">
		<Card800px tag={0} />
	</div>

	<!-- row 2 -->
	<div class="h-full grid gap-2">
		<Card290px tag={0} />
		<Card500px tag={0} />
	</div>

	<!-- row 3 -->
	<div class="h-full grid gap-2">
		<Card500px tag={0} />
		<Card290px tag={0} />
	</div>

	<!-- row 4 -->
	<div class="h-full parent-element">
		<Card800px tag={0} />
	</div>
</section>
