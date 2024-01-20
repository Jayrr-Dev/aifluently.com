<script lang="ts">
	import BentogridA from '$lib/ui/bentogridA.svelte';
	import BentogridB from '$lib/ui/bentogridB.svelte';
	import BentogridB2 from '$lib/ui/bentogridB2.svelte';
</script>

<!-- Check if data is not null or undefined -->

<header class=" text-center p-2">
	<div class="flex justify-center items-center h-32">
		<img class="h-full w-auto" src="/assets/logo/horizontal-gradient.svg" alt="AI FLUENTLY logo" />
	</div>
</header>

<!-- if i = 6 then  -->
<BentogridA category={1} />
<BentogridB category={1} />
