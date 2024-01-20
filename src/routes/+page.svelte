<script lang="ts">
	import BentogridA from '$lib/ui/bentogridA.svelte';
	import BentogridB from '$lib/ui/bentogridB.svelte';
	import BentogridB2 from '$lib/ui/bentogridB2.svelte';
	import BentogridB3 from '$lib/ui/bentogridB3.svelte';
	import IntersectionObserver from '$lib/tools/IntersectionObserver.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let nativeLoading = false;
	// Determine whether to bypass our intersecting check
	onMount(() => {
		if ('loading' in HTMLImageElement.prototype) {
			nativeLoading = true;
		}
	});
	let category: number = 1;
	let fadeOptions = { duration: 1000 };
	let intersecting: any = false;
</script>

<!-- Todo: lazy loading intergration -->

<header class=" text-center p-2">
	<div class="flex justify-center items-center h-32">
		<img class="h-full w-auto" src="/assets/logo/horizontal-gradient.svg" alt="AI FLUENTLY logo" />
	</div>
</header>
<div class="grid justify-center m-10">
	<div class="btn-group variant-filled text-xl">
		<button on:click={() => (category = 1)}>Main</button>
		<button on:click={() => (category = 2)}>Business</button>
		<button on:click={() => (category = 3)}>Education</button>
		<button on:click={() => (category = 4)}>Entertainment</button>
		<button on:click={() => (category = 5)}>Technology</button>
		<button on:click={() => (category = 6)}>Creative</button>
		<button on:click={() => (category = 7)}>Lifestyle</button>
	</div>
</div>

<!-- if i = 6 then  -->
<!-- {#if category === 1}
	<div in:fade={fadeOptions}>
		<IntersectionObserver let:intersecting once={true}>
			{#if intersecting || nativeLoading}
				<div>
					<BentogridA {category} {intersecting} />
				</div>
			{/if}
		</IntersectionObserver>
		<IntersectionObserver let:intersecting once={true}>
			{#if intersecting || nativeLoading}
				<div>
					<BentogridB {category} {intersecting} />
				</div>
			{/if}
		</IntersectionObserver>
	</div>
{/if} -->

{#if category === 1}
	<div in:fade={fadeOptions}>
		<BentogridA {category} {intersecting} />
		<BentogridB {category} {intersecting} />
	</div>
{/if}

{#if category === 2}
	<div in:fade={fadeOptions}>
		<BentogridB {category} {intersecting} />
		<BentogridB2 {category} {intersecting} />
		<BentogridA {category} {intersecting} />
		<BentogridB3 {category} {intersecting} />
	</div>
{/if}

{#if category === 3}
	<div in:fade={fadeOptions}>
		<BentogridA {category} {intersecting} />
		<BentogridB {category} {intersecting} />
		<BentogridB2 {category} {intersecting} />
		<BentogridB3 {category} {intersecting} />
	</div>
{/if}

{#if category === 4}
	<div in:fade={fadeOptions}>
		<BentogridA {category} {intersecting} />
		<BentogridB {category} {intersecting} />
		<BentogridB2 {category} {intersecting} />
		<BentogridB3 {category} {intersecting} />
	</div>
{/if}

{#if category === 5}
	<div in:fade={fadeOptions}>
		<BentogridA {category} {intersecting} />
		<BentogridB {category} {intersecting} />
		<BentogridB2 {category} {intersecting} />
		<BentogridB3 {category} {intersecting} />
	</div>
{/if}

{#if category === 6}
	<div in:fade={fadeOptions}>
		<BentogridA {category} {intersecting} />
		<BentogridB {category} {intersecting} />
		<BentogridB2 {category} {intersecting} />
		<BentogridB3 {category} {intersecting} />
	</div>
{/if}

{#if category === 7}
	<div in:fade={fadeOptions}>
		<BentogridA {category} {intersecting} />
		<BentogridB {category} {intersecting} />
		<BentogridB2 {category} {intersecting} />
		<BentogridB3 {category} {intersecting} />
	</div>
{/if}
