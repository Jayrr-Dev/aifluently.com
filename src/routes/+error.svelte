<script>
	export const config = {
		runtime: 'edge'
	};
	// @ts-nocheck
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import Footer from '$lib/ui/footer.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

{#if $page.status === 404}
	<div class="card variant-glass-warning m-10 flex justify-center p-10 lg:mx-32">
		<div class="my-10">
			<Icon icon="line-md:construction" width="300" />
			<div class="animate-pulse text-center">Page Under Construction...</div>
		</div>
	</div>
{:else}
	<!-- Section: Design Block -->
	<section class="mb-40">
		<!-- Navbar -->

		<!-- Jumbotron -->
		<div class="px-6 py-12 text-center md:px-12 lg:text-left">
			<div class="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl xl:px-32">
				<div class="card variant-ghost grid items-center lg:grid-cols-2">
					<div class="mb-12 md:mt-12 lg:mb-0 lg:mt-0">
						<div
							class="block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14"
						>
							<h1 class="mb-16 mt-2 text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
								{$page.status} <br /><span class="text-primary">{$page.error?.message}</span>
							</h1>
							<a
								class="mb-2 inline-block rounded bg-primary-500/50 px-12 pb-3.5 pt-4 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mb-0 md:mr-2"
								data-te-ripple-init
								data-te-ripple-color="light"
								href="/"
								role="button">Keep Browsing</a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Jumbotron -->
	</section>
	<!-- Section: Design Block -->
{/if}
