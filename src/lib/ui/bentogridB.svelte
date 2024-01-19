<script lang="ts">
	import { onMount } from 'svelte';

	import Icon from '@iconify/svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import { Ratings } from '@skeletonlabs/skeleton';
	export let h1: string;
	export let productlist: any;
	let windowWidth = 0;
	onMount(() => {
		// Set initial width
		updateWidth();

		// Add event listener for window resize
		window.addEventListener('resize', updateWidth);

		// Cleanup function
		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	});

	function updateWidth() {
		windowWidth = window.innerWidth;
	}
</script>

<section
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 m-4 lg:mx-32 xl:mx-32"
>
	<!-- row 1 -->
	<div class="h-full grid gap-2">
		<div class="card h-[300px]">
			<!-- 23 -->
			<header class="card-header text-center p-2"><slot name="header23">-empty-</slot></header>
			<div class="flex justify-start">
				<section
					class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
				>
					<ol>
						<slot name="list23">-empty-</slot>
					</ol>
				</section>
			</div>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
		<div class="card h-[190px]">
			<!-- 24 -->
			<header class="card-header text-center p-2"><slot name="header24">-empty-</slot></header>
			<div class="flex justify-start">
				<section
					class="p-4 w-full h-[110px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
				>
					<ol>
						<slot name="list24">-empty-</slot>
					</ol>
				</section>
			</div>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
	</div>

	<!-- row 3 -->
	<div class="h-full grid gap-2">
		<div class="card h-[190px] grid grid-cols-1">
			<!-- 25 -->
			<header class="card-header text-center p-2"><slot name="header25">-empty-</slot></header>
			<div class="flex justify-start">
				<section
					class="p-4 w-full h-[90px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
				>
					<ol>
						<slot name="list25">-empty-</slot>
					</ol>
				</section>
			</div>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>

		<div class="card h-[300px]">
			<!-- 26 -->
			<header class="card-header text-center p-2"><slot name="header26">-empty-</slot></header>
			<div class="flex justify-start">
				<section
					class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
				>
					<ol>
						<slot name="list26">-empty-</slot>
					</ol>
				</section>
			</div>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
	</div>
	<!-- row 5 -->
	<div class="h-full grid gap-2">
		<div class="card h-[300px]">
			<!-- 27 -->
			<header class="card-header text-center p-2"><slot name="header27">-empty-</slot></header>
			<div class="flex justify-start">
				<section
					class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
				>
					<ol>
						<slot name="list27">-empty-</slot>
					</ol>
				</section>
			</div>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
		<div class="card h-[190px]">
			<!-- 28 -->
			<header class="card-header text-center p-2"><slot name="header28">-empty-</slot></header>
			<div class="flex justify-start">
				<section
					class="p-4 w-full h-[110px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
				>
					<ol>
						<slot name="list28">-empty-</slot>
					</ol>
				</section>
			</div>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
	</div>

	<!-- row 7 -->
	<div class="h-full grid gap-2">
		<div class="card h-[190px] grid grid-cols-1">
			<!-- 29 -->
			<header class="card-header text-center p-2"><slot name="header29">-empty-</slot></header>
			<div class="flex justify-start">
				<section
					class="p-4 w-full h-[90px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
				>
					<ol>
						<slot name="list29">-empty-</slot>
					</ol>
				</section>
			</div>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>

		<div class="card h-[300px]">
			<!-- 30 -->
			<header class="card-header text-center p-2"><slot name="header30">-empty-</slot></header>
			<div class="flex justify-start">
				<section
					class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
				>
					<ol>
						<slot name="list30">-empty-</slot>
					</ol>
				</section>
			</div>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
	</div>
</section>
