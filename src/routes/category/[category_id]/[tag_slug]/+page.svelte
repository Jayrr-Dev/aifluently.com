<script lang="ts">
	import Tagimagecard from '$lib/ui/tagimagecard.svelte';
	// import { page } from '$app/stores';
	export let data;
</script>

<!-- <pre>
    {JSON.stringify(data, null, 2)} 
</pre> -->

<Tagimagecard {data} />
