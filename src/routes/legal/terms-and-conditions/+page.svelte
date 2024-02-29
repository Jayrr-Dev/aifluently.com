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
			Terms and Conditions
		</h1>
		<p class="text-xs sm:text-sm text-gray-600 mb-8">Effective as of January 14, 2024</p>
	</div>

	<div class="max-w-4xl mx-auto text-md text-gray-700">
		<section class="mb-8">
			<h3 class="text-xl font-semibold mb-4">1. Agreement to Terms</h3>
			<p>
				By accessing the Aifluently website at https://www.aifluently.com, you agree to be bound by
				these terms and conditions and accept all legal consequences. If you do not agree with any
				of these terms, you are prohibited from using or accessing this site.
			</p>
		</section>

		<section class="mb-8">
			<h3 class="text-xl font-semibold mb-4">2. Intellectual Property</h3>
			<p>
				The website and its original content, features, and functionality are owned by Aifluently
				and are protected by international copyright and trademark laws.
			</p>
		</section>

		<section class="mb-8">
			<h3 class="text-xl font-semibold mb-4">3. Use License</h3>
			<p>
				A temporary download of one copy of the materials on Aifluently's website is allowed for
				personal, non-commercial viewing. This is a grant of a license, not a transfer of title.
			</p>
		</section>

		<section class="mb-8">
			<h3 class="text-xl font-semibold mb-4">4. Disclaimer</h3>
			<p>
				The materials on Aifluently's website are provided on an 'as is' basis. Aifluently makes no
				warranties, expressed or implied, and hereby disclaims all other warranties.
			</p>
		</section>

		<section class="mb-8">
			<h3 class="text-xl font-semibold mb-4">5. Limitations</h3>
			<p>
				In no event shall Aifluently or its suppliers be liable for any damages arising out of the
				use or inability to use the materials on Aifluently's website.
			</p>
		</section>

		<section class="mb-8">
			<h3 class="text-xl font-semibold mb-4">6. Revisions and Errata</h3>
			<p>
				The materials appearing on Aifluently's website could include technical, typographical, or
				photographic errors. Aifluently does not warrant that any of the materials on its website
				are accurate, complete, or current.
			</p>
		</section>

		<section class="mb-8">
			<h3 class="text-xl font-semibold mb-4">7. Links</h3>
			<p>
				Aifluently has not reviewed all the sites linked to its website and is not responsible for
				the contents of any such linked site.
			</p>
		</section>

		<section class="mb-8">
			<h3 class="text-xl font-semibold mb-4">8. Site Terms of Use Modifications</h3>
			<p>Aifluently may revise these terms of use for its website at any time without notice.</p>
		</section>

		<section class="mb-8">
			<h3 class="text-xl font-semibold mb-4">9. Governing Law</h3>
			<p>
				Any claim related to Aifluently's website shall be governed by the laws of the site owner's
				home jurisdiction without regard to its conflict of law provisions.
			</p>
		</section>

		<h3 class="text-xl font-semibold mb-4">Contact Us</h3>
		<p>
			If you have any questions about these Terms and Conditions, please contact us at
			aifluently@gmail.com.
		</p>
	</div>
</div>
