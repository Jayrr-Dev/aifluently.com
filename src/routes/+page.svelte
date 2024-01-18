<script lang="ts">
	//export let data;
	import Icon from '@iconify/svelte';
	import Bentgridlist from '$lib/ui/bentgridlist.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	let tags: any;
	let productlist: any;
	//gettag onMount
	onMount(async () => {
		tags = await getTag();
		console.log(tags);
	});

	//fetch tag_name from tag_table and filter by category_id
	async function getTag() {
		const { data, error } = await supabase
			.from('tag_table')
			.select('tag_name')
			.eq('category_id', 1)
			.order('tag_name', { ascending: true });
		if (error) {
			console.log(error);
		}
		return data;
	}

	// Fetch product_id using the junction_product_tag filter by tag_id
	async function getProduct(tagId: number): Promise<number[]> {
		const { data, error } = await supabase
			.from('junction_product_tag')
			.select('product_id')
			.eq('tag_id', tagId)
			.order('product_id', { ascending: true });

		if (error) {
			console.error(error);
			return [];
		}
		return data ? data.map((item) => item.product_id) : [];
	}

	// Use the product_id obtained from getProduct to fetch the product_name from product_table
	async function getProductName(productIds: number[]): Promise<string[]> {
		if (productIds.length === 0) {
			return []; // Return an empty array if there are no product IDs
		}

		const { data, error } = await supabase
			.from('product_table')
			.select('product_name')
			.in('product_id', productIds) // Use the array of product_ids here
			.order('product_name', { ascending: true });

		if (error) {
			console.error(error);
			return [];
		}
		return data ? data.map((product) => product.product_name) : [];
	}

	// Example usage
	async function fetchProductNamesByTagId(tagId: number) {
		const productIds = await getProduct(tagId);
		const productNames = await getProductName(productIds);

		console.log(productNames);
		productlist = productNames;
	}

	// Fetching product names for a given tag ID
	fetchProductNamesByTagId(1);
</script>

<!-- Check if data is not null or undefined -->
{#if productlist}
	<header class=" text-center p-2">
		<div class="flex justify-center items-center h-32">
			<img
				class="h-full w-auto"
				src="/assets/logo/horizontal-gradient.svg"
				alt="AI FLUENTLY logo"
			/>
		</div>
	</header>
	<!-- Safely access the first item's tag_name -->
	<Bentgridlist {productlist} gridstart={1}>
		<span slot="header1">{tags[0]?.tag_name}</span>
	</Bentgridlist>
	<Bentgridlist {productlist} gridstart={7} />
{:else}
	<p>Loading...</p>
	<!-- Show a loading message before data is fetched -->
{/if}
