<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { lighttoggle } from '../../stores/store';
	// Function to toggle the lightswitch
	function toggleLightswitch() {
		lighttoggle.update((value: boolean | undefined) => !value);
	}

	$: lightswitch = $lighttoggle;
</script>

<footer class="bg-white dark:bg-gray-900">
	<div class="mx-auto w-full max-w-screen-[1920] p-4 py-6 lg:py-8 lg:px-32">
		<div class="md:flex md:justify-between">
			<div class="mb-6 md:mb-0">
				<a href="/">
					{#if lightswitch}
						<img class="w-56" src="/assets/logo/horizontal-white.svg" alt="AI FLUENTLY logo" />
					{:else}
						<img class="w-56" src="/assets/logo/horizontal-black.svg" alt="AI FLUENTLY logo" />
					{/if}
				</a>
				<p class="mb-3 max-w-lg pt-4 text-gray-600 dark:text-gray-400">
					Aifluently offers a handpicked collection of artificial intelligence tools, providing a
					refined and expertly curated selection to users. Unlike broader, user-generated
					directories, Aifluently focuses on quality over quantity, ensuring that each tool meets a
					high standard of utility and performance. The site is designed for discerning users
					seeking reliable and effective AI solutions, without the need to sift through the
					overwhelming noise of the rapidly growing AI market.
				</p>
			</div>
			<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
				<div>
					<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
						Company
					</h2>
					<ul class="font-medium text-gray-500 dark:text-gray-400">
						<li class="mb-4">
							<a href="/company/our-mission" class="hover:underline">Our Mission</a>
						</li>
						<li class="mb-4">
							<a href="/company/contact-us" class="hover:underline">Contact Us</a>
						</li>
					</ul>
				</div>
				<div>
					<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
						Follow us
					</h2>
					<ul class="font-medium text-gray-500 dark:text-gray-400">
						<li class="mb-4">
							<a href="https://github.com/themesberg/Individuater" class="hover:underline"
								>Twitter</a
							>
						</li>
						<!-- <li class="mb-4">
							<a href="https://github.com/themesberg/Individuater" class="hover:underline"
								>Instagram</a
							>
						</li> -->
						<li class="mb-4">
							<a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Youtube</a>
						</li>
						<li>
							<a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
						</li>
					</ul>
				</div>
				<div>
					<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Legal</h2>
					<ul class="font-medium text-gray-500 dark:text-gray-400">
						<li class="mb-4">
							<a href="/legal/privacy-policy" class="hover:underline">Privacy Policy</a>
						</li>
						<li>
							<a href="/legal/terms-and-conditions" class="hover:underline"
								>Terms &amp; Conditions</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
		<div class="sm:flex sm:items-center sm:justify-between">
			<span class="text-sm text-gray-500 dark:text-gray-400 sm:text-center"
				>© 2023 <a href="https://Individuater.com/" class="hover:underline">Individuater™</a>. All
				Rights Reserved.
			</span>
			<div class="mt-4 flex space-x-5 sm:mt-0 sm:justify-center">
				<a href="/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
					<svg
						class="h-4 w-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 8 19"
					>
						<path
							fill-rule="evenodd"
							d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="sr-only">Facebook page</span>
				</a>
				<a href="/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
					<svg
						class="h-4 w-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 21 16"
					>
						<path
							d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"
						/>
					</svg>
					<span class="sr-only">Discord community</span>
				</a>
				<a href="/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
					<svg
						class="h-4 w-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 17"
					>
						<path
							fill-rule="evenodd"
							d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="sr-only">Twitter page</span>
				</a>
				<a href="/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
					<Icon icon="mdi:youtube" />
					<span class="sr-only">Youtube Channel</span>
				</a>
			</div>
		</div>
	</div>
</footer>
