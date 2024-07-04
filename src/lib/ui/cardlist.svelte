<script lang="ts">
	export let tag: number;
	export let icon: string;
	export let category: number;
	//export let category: number;
	export let product_data: any;
	export let outer_height: string = '200px';
	export let inner_height: string = '150px';
	import { supabase } from '$lib/supabaseClient';
	import { tagToCategory } from '$lib/tools/tagToCategory';
	import { goto } from '$app/navigation';
	import { sluglify } from '$lib/tools/sluglify';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { popup, Ratings } from '@skeletonlabs/skeleton';
	import { lighttoggle } from '../../stores/store';
	import Icon from '@iconify/svelte';
	import { writable } from 'svelte/store';
	import Stars from '$lib/svg/stars.svelte';
	let isMounted = writable(false);
	let showTag = true;
	let windowWidth = 0;
	let tag_name: string = '';
	onMount(() => {
		isMounted.set(true); // Set to true when the component is mounted
	});

	//variables
	$: tag_name = product_data?.aggregated_data[tag].tag_name;
	$: aggregated_data = product_data?.aggregated_data[tag];
	$: product_data;
	$: lightswitch = $lighttoggle;
	$: category;
	$: tag_slug = sluglify(tag_name);
	$: tag_array = product_data?.aggregated_data[tag].tag_array;

	if (category === 0) {
		category = tagToCategory(tag) as number;
	}
</script>

<!-- 
<pre>
	{JSON.stringify(product_data?.aggregated_data[tag].product_table, null, 2)}
</pre> -->
<!-- {product_data?.aggregated_data[tag].product_table}
this
{tag_array} -->
<!-- 
{sluglify(tag_name)}
{category} -->
<!-- {#if product_data}
	{#each product_data?.aggregated_data[tag].product_table || [] as _, i}
		{i}
		{aggregated_data.product_table[i].product_logo}
		{aggregated_data.product_table[i].product_rating}
		{aggregated_data.product_table[i].product_name}
	{/each}
{/if}
<pre>
	{JSON.stringify(product_data?.aggregated_data[tag], null, 2)}
</pre> -->

{#if product_data && $isMounted}
	<div in:fade={{ duration: 400 }}>
		<div class="card grid grid-cols-1 relative card-hover" style={`height: ${outer_height};`}>
			<header class="card-header text-center pr-6">
				<span class="badge text-4xl p-0 m-0 translate-y-2">
					<Icon {icon} />
				</span>
				<span class="text-2xl font-bold uppercase">{tag_name}</span>
			</header>
			<ProgressBar animIndeterminate="anim-progress-bar" rounded="false" height="h-1" />
			<div
				class=" overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
				style={`height: ${inner_height};`}
			>
				{#if showTag}
					<!-- 1 -->

					<div in:fade={{ duration: 800 }}>
						<div class="flex justify-start">
							<section class="p-4 w-full">
								<ol>
									{#each product_data?.aggregated_data[tag].product_table || [] as _, i}
										<!-- ? Tooltip Styles -->

										<div
											class="card p-4 z-10 variant-filled-secondary w-[90%] sm:w-[90%] lg:w-[90%] h-40 lg:h-40"
											data-popup={'popupHover' + tag + '-' + i}
										>
											<div class="grid justify-center">
												<div class="flex">
													<span class="p-1">
														<!-- !Product Logo -->
														{#if aggregated_data.product_table[i].product_logo}
															<img
																class="rounded-full h-5 w-5 object-cover"
																src={aggregated_data.product_table[i].product_logo}
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
															target: 'popupHover' + tag + '-' + i,
															placement: 'top'
														}}
													>
														<!-- !Product Name -->
														{aggregated_data.product_table[i].product_name}
													</span>
												</div>
											</div>
											<div>
												<!-- !Product Rating -->

												<Ratings
													value={Math.round(
														(aggregated_data.product_table[i].product_rating / 20) * 2
													) / 2}
													max={5}
												>
													<svelte:fragment slot="empty"><Stars type="empty" /></svelte:fragment>
													<svelte:fragment slot="half"><Stars type="half" /></svelte:fragment>
													<svelte:fragment slot="full"><Stars type="full" /></svelte:fragment>
												</Ratings>
											</div>
											<p class="p-1 text-sm opacity-80 text-ellipsis overflow-hidden h-16">
												<!-- !Product Description -->
												{#if aggregated_data.product_table[i].product_description}
													{aggregated_data.product_table[i].product_description}
												{:else}
													<!--  -->
												{/if}
											</p>
											{#if windowWidth < 768}
												<!-- Product Review Button for Mobile -->
												<!-- URL REFERENCE -->
												<!-- {aggregated_data.product_table[i].product_name.replace(/\s/g, '')} -->
												<a
													href={'product/' +
														aggregated_data.product_table[i].product_name.replace(/\s/g, '')}
												>
													<div class="flex justify-center">
														<button
															class="btn btn-sm w-[50%] bg-warning-500 border-2 border-black h-6 absolute bottom-2 left-0 right-0 mx-auto"
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
														target: 'popupHover' + tag + '-' + i,
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
															{#if aggregated_data.product_table[i].product_logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={aggregated_data.product_table[i].product_logo}
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
															{aggregated_data.product_table[i].product_name}
														</div>
													</div>
												</button>
												<a
													href={aggregated_data.product_table[i].product_url}
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
													href={aggregated_data.product_table[i].product_name.replace(/\s/g, '')}
													class=" min-w-[70%] group/item"
													use:popup={{
														event: 'hover',
														target: 'popupHover' + tag + '-' + i,
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
															{#if aggregated_data.product_table[i].product_logo}
																<img
																	class="rounded-full h-8 w-8 object-cover"
																	src={aggregated_data.product_table[i].product_logo}
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
															{aggregated_data.product_table[i].product_name}
														</div>
													</div>
												</a>
												<!-- !Link to Site -->
												<a
													href={aggregated_data.product_table[i].product_url}
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
					class=" pointer-events-none h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-800 to-surface-800/0"
				></div>
			{:else}
				<div
					class=" pointer-events-none h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-50 to-white/0"
				></div>
			{/if}

			<div class="btn btn-sm w-full h-8 opacity-0 bg-warning-500 border-2 border-black z-[5]"></div>

			<button
				class="btn btn-sm w-[85%] h-8 bg-warning-500 border-2 border-black z-20 absolute bottom-2 left-0 right-0 mx-auto"
				on:click={() => {
					goto(`/category/${category}/${tag_slug}`);
				}}
			>
				More
			</button>
		</div>
	</div>
{:else}
	<div class="card grid grid-cols-1 relative card-hover" style={`height: ${outer_height};`}></div>
{/if}
