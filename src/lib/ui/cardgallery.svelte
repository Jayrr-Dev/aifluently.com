<script lang="ts">
	import { categoryProductData, main } from '../../stores/productStore';
	import { get } from 'svelte/store';
	import Cardlist from './cardlist.svelte';
	export let category = 0;
	let category_data = get(categoryProductData);
	let product_data: any = category_data[category];
</script>

<!-- <pre>
    {JSON.stringify(product_data, null, 2)}
</pre> -->
{#if product_data}
	<section class="grid grid-cols-2 md:grid-cols-3 gap-4">
		{#each product_data.aggregated_data || [] as _, i}
			<div class="parent-element">
				<Cardlist
					tag={i}
					{product_data}
					outer_height="300px"
					inner_height="200px"
					icon="quill:chat"
				/>
			</div>
		{/each}
	</section>
{/if}
