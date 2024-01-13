<script lang="ts">
	export let data;
	import Icon from '@iconify/svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Ratings } from '@skeletonlabs/skeleton';

	//tooltips
	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	interface aiTools {
		id: number;
		name: string;
		logo: string;
		url: string;
		description: string;
		rating: number;
		userrating: number;
	}

	interface aiCategories {
		id: number;
		name: string;
		tools: aiTools[];
	}

	// Each category now has its own tools
	let aiCategories: aiCategories[] = [
		{
			id: 1,
			name: 'Skeleton',
			tools: [
				{
					id: 1,
					name: 'xTool 1',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4,
					userrating: 4.5
				},
				{
					id: 2,
					name: 'xTool 2',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 3,
					name: 'xTool 3',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 4,
					name: 'xTool 4',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 5,
					name: 'xTool 5',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 6,
					name: 'xTool 6',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 1.5,
					userrating: 4.5
				},
				{
					id: 7,
					name: 'xTool 7',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 8,
					name: 'xTool 8',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				}
			]
		},
		{
			id: 2,
			name: 'Skeleton 2',
			tools: [
				{
					id: 1,
					name: 'xTool 1',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 2,
					name: 'xTool 2',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 3,
					name: 'xTool 3',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 4,
					name: 'xTool 4',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 5,
					name: 'xTool 5',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 6,
					name: 'xTool 6',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 7,
					name: 'xTool 7',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				},
				{
					id: 8,
					name: 'xTool 8',
					logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
					url: 'test.com',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					rating: 4.5,
					userrating: 4.5
				}
			]
		}
	];
	// A reactive variable to track which popup should be shown
	let activePopup = null;

	function activatePopup(toolId: number) {
		setTimeout(() => {
			activePopup = toolId;
		}, 2000); // Delay of 2 seconds
	}
</script>

<header class=" text-center p-2">
	<div class="flex justify-center items-center h-32">
		<img class="h-full w-auto" src="/assets/logo/horizontal-gradient.svg" alt="AI FLUENTLY logo" />
	</div>
</header>

<section
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 m-4 lg:mx-32 xl:mx-32"
>
	<!-- section 1 -->
	<div class="h-full">
		<div class="card h-[500px] grid grid-cols-1">
			<!-- Category 2 -->
			<header class="card-header text-center p-2">{aiCategories[0].name}</header>
			<section
				class="p-4 h-[410px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
			>
				{#each aiCategories[0].tools as tool, i (tool.id)}
					<ol class="flex justify-between">
						<!-- Trigger -->
						<a href="/elements/lists">
							<div class="flex">
								<span>{tool.id}.</span>
								<span class="p-1.5">
									<img class="h-4 w-4" src={tool.logo} alt="AI FLUENTLY logo" />
								</span>
								<span
									class="flex-auto [&>*]:pointer-events-none"
									use:popup={{ event: 'hover', target: 'popupHover1-' + i, placement: 'top' }}
								>
									{tool.name} test
								</span>
							</div>
						</a>
						<a href="/elements/lists" class="flex opacity-50 hover:opacity-100 p-1">
							<Icon icon="system-uicons:jump-up" />
						</a>
						<!-- Popup -->
						<div
							class="card p-4 variant-filled-secondary w-[80%] sm:w-[40%] lg:w-[20%] h-32"
							data-popup={'popupHover1-' + i}
						>
							<div class="grid justify-center">
								<div class="flex">
									<span class="p-1">
										<img class="h-4 w-4" src={tool.logo} alt="AI FLUENTLY logo" />
									</span>
									<span
										class="font-bold flex-auto [&>*]:pointer-events-none"
										use:popup={{ event: 'hover', target: 'popupHover1-' + i, placement: 'top' }}
									>
										{tool.name}
									</span>
								</div>
							</div>
							<div>
								<Ratings value={tool.rating} max={5}>
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
								{tool.description}
							</p>
							<div class="arrow variant-filled-secondary" />
						</div>
					</ol>
				{/each}
			</section>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
	</div>
	<div class="h-full grid gap-2">
		<div class="card h-[190px] grid grid-cols-1">
			<!-- Category 2 -->
			<header class="card-header text-center p-2">{aiCategories[1].name}</header>
			<section
				class="p-4 h-[100px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
			>
				{#each aiCategories[1].tools as tool, i (tool.id)}
					<ol class="flex justify-between">
						<!-- Trigger -->
						<a href="/elements/lists">
							<span>{tool.id}.</span>
							<span class="badge">-</span>
							<span
								class="flex-auto [&>*]:pointer-events-none"
								use:popup={{ event: 'hover', target: 'popupHover2-' + i, placement: 'top' }}
							>
								{tool.name}
							</span>
						</a>
						<a href="/elements/lists" class="flex opacity-50 hover:opacity-100 p-1">
							<Icon icon="system-uicons:jump-up" />
						</a>
						<!-- Popup -->
						<div class="card p-4 variant-filled-secondary" data-popup={'popupHover2-' + i}>
							<h1>{tool.name}</h1>

							<div class="arrow variant-filled-secondary" />
						</div>
					</ol>
				{/each}
			</section>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
		<div class="card h-[300px]"></div>
	</div>
	<div class="h-full grid gap-2">
		<div class="card h-[300px]"></div>
		<div class="card h-[190px]"></div>
	</div>
	<div class="h-full"><div class="card h-[500px]"></div></div>
	<!-- section 2 -->

	<!-- section 3 -->
</section>
<section
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 m-4 lg:mx-32 xl:mx-32"
>
	<!-- section 1 -->
	<div class="h-full">
		<div class="card h-[500px] grid grid-cols-1">
			<!-- Category 2 -->
			<header class="card-header text-center p-2">{aiCategories[0].name}</header>
			<section
				class="p-4 h-[410px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
			>
				{#each aiCategories[0].tools as tool, i (tool.id)}
					<ol class="flex justify-between">
						<!-- Trigger -->
						<a href="/elements/lists">
							<div class="flex">
								<span>{tool.id}.</span>
								<span class="p-1.5">
									<img class="h-4 w-4" src={tool.logo} alt="AI FLUENTLY logo" />
								</span>
								<span
									class="flex-auto [&>*]:pointer-events-none"
									use:popup={{ event: 'hover', target: 'popupHover1-' + i, placement: 'top' }}
								>
									{tool.name} test
								</span>
							</div>
						</a>
						<a href="/elements/lists" class="flex opacity-50 hover:opacity-100 p-1">
							<Icon icon="system-uicons:jump-up" />
						</a>
						<!-- Popup -->
						<div
							class="card p-4 variant-filled-secondary w-[80%] sm:w-[40%] lg:w-[20%] h-32"
							data-popup={'popupHover1-' + i}
						>
							<div class="grid justify-center">
								<div class="flex">
									<span class="p-1">
										<img class="h-4 w-4" src={tool.logo} alt="AI FLUENTLY logo" />
									</span>
									<span
										class="font-bold flex-auto [&>*]:pointer-events-none"
										use:popup={{ event: 'hover', target: 'popupHover1-' + i, placement: 'top' }}
									>
										{tool.name}
									</span>
								</div>
							</div>
							<div>
								<Ratings value={tool.rating} max={5}>
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
								{tool.description}
							</p>
							<div class="arrow variant-filled-secondary" />
						</div>
					</ol>
				{/each}
			</section>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
	</div>
	<div class="h-full grid gap-2">
		<div class="card h-[190px] grid grid-cols-1">
			<!-- Category 2 -->
			<header class="card-header text-center p-2">{aiCategories[1].name}</header>
			<section
				class="p-4 h-[100px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
			>
				{#each aiCategories[1].tools as tool, i (tool.id)}
					<ol class="flex justify-between">
						<!-- Trigger -->
						<a href="/elements/lists">
							<span>{tool.id}.</span>
							<span class="badge">-</span>
							<span
								class="flex-auto [&>*]:pointer-events-none"
								use:popup={{ event: 'hover', target: 'popupHover2-' + i, placement: 'top' }}
							>
								{tool.name}
							</span>
						</a>
						<a href="/elements/lists" class="flex opacity-50 hover:opacity-100 p-1">
							<Icon icon="system-uicons:jump-up" />
						</a>
						<!-- Popup -->
						<div class="card p-4 variant-filled-secondary" data-popup={'popupHover2-' + i}>
							<h1>{tool.name}</h1>

							<div class="arrow variant-filled-secondary" />
						</div>
					</ol>
				{/each}
			</section>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
		<div class="card h-[300px]"></div>
	</div>
	<div class="h-full grid gap-2">
		<div class="card h-[300px]"></div>
		<div class="card h-[190px]"></div>
	</div>
	<div class="h-full"><div class="card h-[500px]"></div></div>
	<!-- section 2 -->

	<!-- section 3 -->
</section>
<section
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 m-4 lg:mx-32 xl:mx-32"
>
	<!-- section 1 -->
	<div class="h-full">
		<div class="card h-[500px] grid grid-cols-1">
			<!-- Category 2 -->
			<header class="card-header text-center p-2">{aiCategories[0].name}</header>
			<section
				class="p-4 h-[410px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
			>
				{#each aiCategories[0].tools as tool, i (tool.id)}
					<ol class="flex justify-between">
						<!-- Trigger -->
						<a href="/elements/lists">
							<div class="flex">
								<span>{tool.id}.</span>
								<span class="p-1.5">
									<img class="h-4 w-4" src={tool.logo} alt="AI FLUENTLY logo" />
								</span>
								<span
									class="flex-auto [&>*]:pointer-events-none"
									use:popup={{ event: 'hover', target: 'popupHover1-' + i, placement: 'top' }}
								>
									{tool.name} test
								</span>
							</div>
						</a>
						<a href="/elements/lists" class="flex opacity-50 hover:opacity-100 p-1">
							<Icon icon="system-uicons:jump-up" />
						</a>
						<!-- Popup -->
						<div
							class="card p-4 variant-filled-secondary w-[80%] sm:w-[40%] lg:w-[20%] h-32"
							data-popup={'popupHover1-' + i}
						>
							<div class="grid justify-center">
								<div class="flex">
									<span class="p-1">
										<img class="h-4 w-4" src={tool.logo} alt="AI FLUENTLY logo" />
									</span>
									<span
										class="font-bold flex-auto [&>*]:pointer-events-none"
										use:popup={{ event: 'hover', target: 'popupHover1-' + i, placement: 'top' }}
									>
										{tool.name}
									</span>
								</div>
							</div>
							<div>
								<Ratings value={tool.rating} max={5}>
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
								{tool.description}
							</p>
							<div class="arrow variant-filled-secondary" />
						</div>
					</ol>
				{/each}
			</section>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
	</div>
	<div class="h-full grid gap-2">
		<div class="card h-[190px] grid grid-cols-1">
			<!-- Category 2 -->
			<header class="card-header text-center p-2">{aiCategories[1].name}</header>
			<section
				class="p-4 h-[100px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
			>
				{#each aiCategories[1].tools as tool, i (tool.id)}
					<ol class="flex justify-between">
						<!-- Trigger -->
						<a href="/elements/lists">
							<span>{tool.id}.</span>
							<span class="badge">-</span>
							<span
								class="flex-auto [&>*]:pointer-events-none"
								use:popup={{ event: 'hover', target: 'popupHover2-' + i, placement: 'top' }}
							>
								{tool.name}
							</span>
						</a>
						<a href="/elements/lists" class="flex opacity-50 hover:opacity-100 p-1">
							<Icon icon="system-uicons:jump-up" />
						</a>
						<!-- Popup -->
						<div class="card p-4 variant-filled-secondary" data-popup={'popupHover2-' + i}>
							<h1>{tool.name}</h1>

							<div class="arrow variant-filled-secondary" />
						</div>
					</ol>
				{/each}
			</section>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
		<div class="card h-[300px]"></div>
	</div>
	<div class="h-full grid gap-2">
		<div class="card h-[300px]"></div>
		<div class="card h-[190px]"></div>
	</div>
	<div class="h-full"><div class="card h-[500px]"></div></div>
	<!-- section 2 -->

	<!-- section 3 -->
</section>
