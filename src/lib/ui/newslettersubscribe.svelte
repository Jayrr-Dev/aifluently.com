<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { writable } from 'svelte/store';

	const email = writable('');
	const errorMessage = writable('');
	const success = writable(false);
	const recaptchaToken = writable('');

	function validateEmail(email: string): boolean {
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return pattern.test(email);
	}

	async function subscribeToNewsletter() {
		if (!validateEmail($email)) {
			errorMessage.set('Please enter a valid email address.');
			return;
		}

		const { data, error } = await supabase
			.from('newsletter_email_list')
			.insert([{ email: $email, recaptcha_token: $recaptchaToken }]);

		if (error) {
			console.error('Error subscribing to newsletter:', error);
			errorMessage.set('Something went wrong. Please try again.');
		} else {
			console.log('Subscribed successfully:', data);
			email.set('');
			errorMessage.set('');
			success.set(true);
		}
	}

	// Function to handle the reCAPTCHA callback
	function onRecaptchaSuccess(token: string) {
		recaptchaToken.set(token);
		//console.log('reCAPTCHA token:', token);
		subscribeToNewsletter();
	}
</script>

<svelte:head>
	<script
		src="https://www.google.com/recaptcha/api.js?render=6Lc7MIQpAAAAADJWdUF7m6lcDKXpc9iT2jiyUc7Z
    "
	></script>
</svelte:head>

<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
	<div class="col-span-1 sm:col-span-2 relative">
		<input
			type="email"
			class=" rounded-lg shadow-sm w-full px-4 py-3 focus:outline-none focus:shadow-outline text-gray-600 font-medium"
			placeholder="Your email address"
			autocomplete="email"
			bind:value={$email}
		/>
	</div>
	<button
		class="btn w-full sm:w-auto bg-indigo-600 text-white px-10 py-3 rounded-lg hover:bg-indigo-500"
		on:click={() => {
			window.grecaptcha.ready(() => {
				window.grecaptcha
					.execute('6Lc7MIQpAAAAADJWdUF7m6lcDKXpc9iT2jiyUc7Z', { action: 'submit' })
					.then(onRecaptchaSuccess);
			});
		}}
	>
		{#if !$success && !$errorMessage}
			Subscribe
		{:else if $errorMessage}
			<p class="text-error-500 font-bold ml-4">{$errorMessage}</p>
		{:else if $success}
			<p class="text-success-500 font-bold ml-4">Subscribed successfully</p>
		{/if}
	</button>
</div>
<p class="text-gray-600/30 text-xs ml-4 w-full">
	This site is protected by reCAPTCHA and the Google
	<a href="https://policies.google.com/privacy">Privacy Policy</a> and
	<a href="https://policies.google.com/terms">Terms of Service</a> apply.
</p>
