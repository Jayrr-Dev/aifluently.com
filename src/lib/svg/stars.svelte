<script lang="ts">
	export let type: string = '1';
</script>

{#if type == 'empty'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
		<path
			fill="grey"
			fill-opacity="0"
			stroke="grey"
			stroke-dasharray="64"
			stroke-dashoffset="64"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M12 3L14.35 8.76L20.56 9.22L15.8 13.24L17.29 19.28L12 16L6.71 19.28L8.2 13.24L3.44 9.22L9.65 8.76Z"
		>
			<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
			<animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.15s" values="0;0.3" />
		</path>
	</svg>
{:else if type == 'half'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
		<path
			fill="none"
			stroke="gold"
			stroke-dasharray="32"
			stroke-dashoffset="32"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16M12 3L14.35 8.76L20.56 9.22L15.8 13.24L17.29 19.28L12 16"
		>
			<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="32;0" />
		</path>
		<path fill="gold" fill-opacity="0" d="M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16Z">
			<animate fill="freeze" attributeName="fill-opacity" begin="0.5s" dur="0.5s" values="0;1" />
		</path>
	</svg>
{:else if type == 'full'}
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
		<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
			<path d="M0 0h24v24H0z" />
			<path
				fill="gold"
				d="m8.243 7.34l-6.38.925l-.113.023a1 1 0 0 0-.44 1.684l4.622 4.499l-1.09 6.355l-.013.11a1 1 0 0 0 1.464.944l5.706-3l5.693 3l.1.046a1 1 0 0 0 1.352-1.1l-1.091-6.355l4.624-4.5l.078-.085a1 1 0 0 0-.633-1.62l-6.38-.926l-2.852-5.78a1 1 0 0 0-1.794 0z"
			/>
		</g>
	</svg>
{/if}
