<script lang="ts">
	import { goto } from '$app/navigation';

	import Backbtn from '$lib/svg/backbtn.svelte';
</script>

<!-- <pre>
    {JSON.stringify(username, null, 2)}
</pre> -->

<div class="max-w-xl mx-auto px-4 py-8 sm:max-w-2xl md:max-w-3xl">
	<button
		class="py-6"
		on:click={() => {
			goto('/');
		}}
	>
		<Backbtn />
	</button>
	<div class="text-center">
		<h1
			class="text-xl font-serif font-extrabold mb-4 leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
		>
			Privacy Policy
		</h1>
		<div class=" text-gray-600 text-xs sm:text-sm mb-8">Last updated on November 12, 2023</div>
	</div>

	<div class="max-w-4xl mx-auto text-sm text-gray-700">
		<p class="mt-4">
			This Privacy Policy ("Policy") describes how Aifluently ("we", "us", or "our") collects,
			protects, and uses the personally identifiable information ("Personal Information") you
			("User", "you", or "your") may provide on the Aifluently website (aifluently.com) and any of
			its products or services (collectively, "Website" or "Services"). It also describes the
			choices available to you regarding our use of your Personal Information and how you can access
			and update this information.
		</p>
		<h3 class="mt-6 text-lg font-semibold">Collection of Personal Information</h3>
		<p class="mt-2">
			We receive and store any information you knowingly provide to us when you fill any online
			forms on the Website. This may include your name, email address, company name, and any other
			Personal Information required for you to access our premium content and services. When
			required, this information may include your contact details and billing information.
		</p>
		<h3 class="mt-6 text-lg font-semibold">Collection of Non-Personal Information</h3>
		<p class="mt-2">
			When you visit the Website, our servers automatically record information that your browser
			sends. This data may include information such as your device's IP address, browser type and
			version, operating system type and version, language preferences, or the webpage you were
			visiting before you came to our Website, pages of our Website that you visit, the time spent
			on those pages, information you search for on our Website, access times and dates, and other
			statistics.
		</p>
		<h3 class="mt-6 text-lg font-semibold">Use and Processing of Collected Information</h3>
		<p class="mt-2">
			Any of the information we collect from you may be used to personalize your experience, improve
			our Website, improve customer service, process transactions, send notification emails such as
			password reminders, updates, etc., and operate our Website. Non-Personal Information collected
			is used only to identify potential cases of abuse and establish statistical information
			regarding Website usage.
		</p>
		<h3 class="mt-6 text-lg font-semibold">Managing Personal Information</h3>
		<p class="mt-2">
			You are able to update your Personal Information in your account settings on the Website. You
			may also request that we delete your Personal Information, but this may prevent you from
			accessing our premium content and services.
		</p>
		<h3 class="mt-6 text-lg font-semibold">Cookies</h3>
		<p class="mt-2">
			The Website uses "cookies" to help personalize your online experience. A cookie is a text file
			that is placed on your hard disk by a web page server. Cookies cannot be used to run programs
			or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be
			read by a web server in the domain that issued the cookie to you.
		</p>
		<h3 class="mt-6 text-lg font-semibold">Changes and Amendments</h3>
		<p class="mt-2">
			We reserve the right to modify this privacy policy relating to the Website at any time,
			effective upon posting of an updated version of this Policy on the Website. Continued use of
			the Website after any such changes shall constitute your consent to such changes.
		</p>
		<h3 class="mt-6 text-lg font-semibold">Acceptance of This Policy</h3>
		<p class="mt-2">
			You acknowledge that you have read this Policy and agree to all its terms and conditions. By
			using the Website, you agree to be bound by this Policy. If you do not agree to abide by the
			terms of this Policy, you are not authorized to use or access the Website.
		</p>
		<h3 class="mt-6 text-lg font-semibold">Contacting Us</h3>
		<p class="mt-2">
			If you have any questions about this Policy, please contact us at aifluently@gmail.com.
		</p>
	</div>
</div>
