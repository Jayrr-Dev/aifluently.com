<script lang="ts">
	export let data;
	import Icon from '@iconify/svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	//tooltips
	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	// Each category now has its own tools
	let aiCategories = [
		{
			id: 1,
			name: 'Skeleton',
			tools: [
				{ id: 1, name: 'Tool 1' },
				{ id: 2, name: 'Tool 2' },
				{ id: 3, name: 'Tool 3' },
				{ id: 4, name: 'Tool 4' }
			]
		},
		{
			id: 2,
			name: 'Skeleton 2',
			tools: [
				{ id: 1, name: 'Tool 1' },
				{ id: 2, name: 'Tool 2' },
				{ id: 3, name: 'Tool 3' },
				{ id: 4, name: 'Tool 4' },
				{ id: 5, name: 'Tool 5' },
				{ id: 6, name: 'Tool 6' },
				{ id: 7, name: 'Tool 7' },
				{ id: 8, name: 'Tool 8' }
			]
		},
		{
			id: 3,
			name: 'Skeleton 3',
			tools: [
				{ id: 1, name: 'Tool 1' },
				{ id: 2, name: 'Tool 2' }
			]
		},
		{
			id: 4,
			name: 'Skeleton 4',
			tools: [
				{ id: 1, name: 'Tool 1' },
				{ id: 2, name: 'Tool 2' }
			]
		},
		{
			id: 5,
			name: 'Skeleton 5',
			tools: [
				{ id: 1, name: 'Tool 1' },
				{ id: 2, name: 'Tool 2' }
			]
		},
		{
			id: 6,
			name: 'Skeleton 6',
			tools: [
				{ id: 1, name: 'Tool 1' },
				{ id: 2, name: 'Tool 2' }
			]
		},
		{
			id: 7,
			name: 'Skeleton 7',
			tools: [
				{ id: 1, name: 'Tool 1' },
				{ id: 2, name: 'Tool 2' }
			]
		},
		{
			id: 8,
			name: 'Skeleton 8',
			tools: [
				{ id: 1, name: 'Tool 1' },
				{ id: 2, name: 'Tool 2' }
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
		<img class="h-full w-auto" src="/assets/logo/vertical-gradient.svg" alt="AI FLUENTLY logo" />
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
							<span>{tool.id}.</span>
							<span class="badge">-</span>
							<span
								class="flex-auto [&>*]:pointer-events-none"
								use:popup={{ event: 'hover', target: 'popupHover-' + i, placement: 'top' }}
							>
								{tool.name}
							</span>
						</a>
						<a href="/elements/lists" class="flex opacity-50 hover:opacity-100 p-1">
							<Icon icon="system-uicons:jump-up" />
						</a>
						<!-- Popup -->
						<div class="card p-4 variant-filled-secondary" data-popup={'popupHover-' + i}>
							<p>Details about {tool.name}</p>
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
								use:popup={{ event: 'hover', target: 'popupHover-' + i, placement: 'top' }}
							>
								{tool.name}
							</span>
						</a>
						<a href="/elements/lists" class="flex opacity-50 hover:opacity-100 p-1">
							<Icon icon="system-uicons:jump-up" />
						</a>
						<!-- Popup -->
						<div class="card p-4 variant-filled-secondary" data-popup={'popupHover-' + i}>
							<p>Details about {tool.name}</p>
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

<!-- {#each aiCategories as category (category.id)}
	<div class="card max-w-full h-48">
		<header class="card-header text-center p-2">{category.name}</header>
		<section class="p-4">
			<nav class="list-nav">
				<ul>
					{#each category.tools as tool (tool.id)}
						<li>
							<a href="/elements/lists">
								<span>{tool.id}.</span>
								<span class="badge">-</span>
								<span class="flex-auto">{tool.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</section>
	</div>
{/each} -->
