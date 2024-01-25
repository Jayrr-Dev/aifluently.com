<script lang="ts">
	export let tag: number;
	export let icon: string;
	export let category: number;
	import { onMount } from 'svelte';
	import { tagsState } from '../../stores/tagsStore';
	import { fade } from 'svelte/transition';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { popup, Ratings } from '@skeletonlabs/skeleton';
	import { lighttoggle } from '../../stores/store';

	import Icon from '@iconify/svelte';
	let showTag = true;
	let state: any;
	let windowWidth = 0;

	onMount(() => {
		//windowidth
		updateWidth();
		window.addEventListener('resize', updateWidth);
		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	});
	function updateWidth() {
		windowWidth = window.innerWidth;
	}

	tagsState.subscribe(($state) => {
		state = $state;
		console.log('state', state);
	});
	$: lightswitch = $lighttoggle;
</script>

{#if state && state[category] && showTag}
	<div class="card h-[290px] grid grid-cols-1 relative card-hover">
		<header class="card-header text-center pr-6">
			{#if state[category].tags[tag] && showTag}
				<div in:fade={{ duration: 800 }}>
					<span class="badge text-4xl p-0 m-0 translate-y-2">
						<Icon {icon} />
					</span>
					<span class="text-2xl font-bold uppercase">
						{state[category].tags[tag]}
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
								{#each state[category].tagProductDetails[tag] as product, i}
									<!-- ? Tooltip Styles -->
									<div
										class="card p-4 z-10 variant-filled-secondary w-[90%] sm:w-[90%] lg:w-[90%] h-40 lg:h-36"
										data-popup={'popupHover' + tag + '-' + i}
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
														target: 'popupHover' + tag + '-' + i,
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
													<div class="pt-1 group-hover/item:underline group-active/item:underline">
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
				class=" pointer-events-none h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-800 to-surface-800/0"
			></div>
		{:else}
			<div
				class=" pointer-events-none h-16 absolute w-full bottom-10 bg-gradient-to-t from-surface-50 to-white/0"
			></div>
		{/if}

		<div class="btn btn-sm w-full h-8 opacity-0 bg-warning-500 border-2 border-black z-[5]"></div>
		<button
			class="btn btn-sm w-[85%] h-8 bg-warning-500 border-2 border-black z-[0] absolute bottom-2 left-0 right-0 mx-auto"
		>
			More
		</button>
	</div>
{/if}
