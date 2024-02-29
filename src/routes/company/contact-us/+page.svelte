<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { writable } from 'svelte/store';
	import Slider from '$lib/ui/slider.svelte';
	const first_name = writable('');
	const last_name = writable('');
	const email = writable('');
	const message = writable('');
	const errorMessage = writable('');
	const success = writable(false);
	const recaptchaToken = writable('');
	const company = writable('');
	const agreedToPrivacyPolicy = writable(false);

	function validateForm(): boolean {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return (
			$first_name.trim() !== '' &&
			$last_name.trim() !== '' &&
			emailPattern.test($email) &&
			$message.trim() !== '' &&
			$agreedToPrivacyPolicy
		);
	}

	async function sendMessage() {
		if (!validateForm()) {
			errorMessage.set(
				'Please fill in all fields with valid information and agree to the privacy policy.'
			);
			return;
		}

		const { data, error } = await supabase.from('contact_messages').insert([
			{
				first_name: $first_name,
				last_name: $last_name,
				email: $email,
				message: $message,
				recaptcha_token: $recaptchaToken,
				company: $company
			}
		]);

		if (error) {
			console.error('Error sending message:', error);
			errorMessage.set('Something went wrong. Please try again.');
		} else {
			success.set(true);
			console.log('Message sent successfully:', data);
			first_name.set('');
			last_name.set('');
			company.set('');
			email.set('');
			message.set('');
			errorMessage.set('');
			agreedToPrivacyPolicy.set(false);
		}
	}

	function onRecaptchaSuccess(token: string) {
		recaptchaToken.set(token);
		sendMessage();
	}

	function togglePrivacyPolicyAgreement() {
		agreedToPrivacyPolicy.set(!$agreedToPrivacyPolicy);
	}
</script>

<svelte:head>
	<script
		src="https://www.google.com/recaptcha/api.js?render=6Lc7MIQpAAAAADJWdUF7m6lcDKXpc9iT2jiyUc7Z"
	></script>
</svelte:head>
<Slider />

<div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 grid justify-center">
	<div
		class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
		aria-hidden="true"
	>
		<div
			class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>
	<div class="card max-w-2xl p-8 md:p-16 lg:p-24 xl:p-32">
		<div class="mx-auto text-center">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
			<p class="mt-2 text-lg leading-8 text-gray-600">
				We'd love to hear from you. Send us a message.
			</p>
		</div>
		<form
			action="#"
			method="POST"
			class=" mx-auto mt-16 sm:mt-20"
			on:submit|preventDefault={sendMessage}
		>
			<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
				<div>
					<label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900"
						>First name</label
					>
					<div class="mt-2.5">
						<input
							bind:value={$first_name}
							type="text"
							name="first-name"
							id="first-name"
							autocomplete="given-name"
							class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
				<div>
					<label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900"
						>Last name</label
					>
					<div class="mt-2.5">
						<input
							bind:value={$last_name}
							type="text"
							name="last-name"
							id="last-name"
							autocomplete="family-name"
							class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
				<div class="sm:col-span-2">
					<label for="company" class="block text-sm font-semibold leading-6 text-gray-900"
						>Company</label
					>
					<div class="mt-2.5">
						<input
							bind:value={$company}
							type="text"
							name="company"
							id="company"
							autocomplete="organization"
							class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
				<div class="sm:col-span-2">
					<label for="email" class="block text-sm font-semibold leading-6 text-gray-900"
						>Email</label
					>
					<div class="mt-2.5">
						<input
							bind:value={$email}
							type="email"
							name="email"
							id="email"
							autocomplete="email"
							class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="sm:col-span-2">
					<label for="message" class="block text-sm font-semibold leading-6 text-gray-900"
						>Message</label
					>
					<div class="mt-2.5">
						<textarea
							bind:value={$message}
							name="message"
							id="message"
							rows="4"
							class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						></textarea>
					</div>
				</div>
				<div class="flex gap-x-4 sm:col-span-2">
					<div class="flex h-6 items-center">
						<!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
						<button
							type="button"
							class="bg-gray-200 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							role="switch"
							aria-checked={$agreedToPrivacyPolicy}
							aria-labelledby="switch-1-label"
							on:click={togglePrivacyPolicyAgreement}
						>
							<span class="sr-only">Agree to policies</span>
							<span
								aria-hidden="true"
								class="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out slider"
								class:switch-on={$agreedToPrivacyPolicy}
							></span>
						</button>
					</div>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="text-sm leading-6 text-gray-600" id="switch-1-label">
						By selecting this, you agree to our
						<a href="/legal/privacy-policy" class="font-semibold text-indigo-600"
							>privacy&nbsp;policy</a
						>.
					</label>
				</div>
			</div>
			<div class="mt-10">
				<button
					type="submit"
					class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					on:click={() => {
						window.grecaptcha.ready(() => {
							window.grecaptcha
								.execute('6Lc7MIQpAAAAADJWdUF7m6lcDKXpc9iT2jiyUc7Z', { action: 'submit' })
								.then(onRecaptchaSuccess);
						});
					}}>Let's talk</button
				>
			</div>

			{#if !$success && !$errorMessage}
				<p class="text-gray-600/30 text-xs ml-4">
					This site is protected by reCAPTCHA and the Google
					<a href="https://policies.google.com/privacy">Privacy Policy</a> and
					<a href="https://policies.google.com/terms">Terms of Service</a> apply.
				</p>
			{:else if $errorMessage}
				<p class="text-error-500 ml-4">{$errorMessage}</p>
			{:else if $success}
				<p class="text-success-500 ml-4">Sent successfully</p>
			{/if}
		</form>
	</div>
</div>
