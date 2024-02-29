<script lang="ts">
	export let data;
	import { tagToTagName } from '$lib/tools/tagToTagName.js';
	import { tagToCategory } from '$lib/tools/tagToCategory.js';
	import { goto } from '$app/navigation';
	import { sluglify } from '$lib/tools/sluglify.js';
	import Newslettersubscribe from '$lib/ui/newslettersubscribe.svelte';
	let articles = data.article;
</script>

<!-- <pre>
    {JSON.stringify(articles?.tag[i], null, 2)}
</pre> -->

<div class="p-5">
	<div class="max-w-6xl mx-auto">
		<h1 class="text-4xl font-bold mb-4">Articles</h1>

		<h2 class="text-xl font-bold text-gray-700 mb-4">Test, test, test and test</h2>

		<!-- newsletter sub -->
		<div class="flex flex-wrap items-center mb-8">
			<div class="flex items-center text-gray-600 text-sm min-w-[300px] pr-5">
				<p class="text-gray-600 text-lg">
					Subscribe and stay up to date with the latest Ai tips and news.
				</p>
			</div>
			<!-- Newsletter Sub -->
			<Newslettersubscribe />
		</div>
	</div>
</div>

<div class="bg-gray-100 min-h-screen p-5">
	<div class="max-w-6xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-5 lg:grid-cols-3 gap-4">
			{#each articles || [] as article, i}
				{#if i == 0}
					<div
						class=" row-span-2 col-span-2 w-full card card-hover bg-white rounded-lg shadow hover:shadow-md transition duration-300 overflow-hidden"
					>
						<button
							class="p-5 text-left w-full"
							on:click={() => {
								goto(`/articles/${article.title}`);
							}}
						>
							<h2 class="font-bold text-3xl mb-2 text-gray-800">{article.title}</h2>
							<p class="text-gray-600 text-sm mb-4">{article.excerpt}</p>
							<div class="flex items-center text-gray-500 text-xs">
								<!-- Avatar and author name -->
								<div class="flex items-center">
									<img
										class="w-8 h-8 rounded-full mr-2 object-cover"
										src={article.author?.avatar_url || 'https://via.placeholder.com/30'}
										alt="Author avatar"
									/>
									<span>{article.author?.username || 'Unknown Author'}</span>
								</div>
								<span class="mx-2">·</span>
								<!-- Reading time and publication date -->
								<span>{article.read_time} min read</span>
								<span class="mx-2">·</span>
								<time datetime={article.published_date}>
									{new Date(article.published_date).toLocaleDateString()}
								</time>
							</div>
							<!-- Article tag -->
						</button>
						<div class="ml-4 mb-2">
							{#each article.tag || [] as tag, i}
								<button
									class="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded z-10"
									on:click={() => {
										goto(
											`/category/${tagToCategory(article.tag[i])}/${sluglify(
												tagToTagName(article.tag[i])
											)}`
										);
									}}
								>
									{tagToTagName(article.tag[i])}
								</button>
							{/each}
						</div>
						<!-- Placeholder for image if needed -->
						{#if article.featured_image}
							<img class="w-full h-96 object-cover" src={article.featured_image} alt="Article " />
						{:else}
							<img
								class="w-full h-96 object-cover"
								src="https://via.placeholder.com/800x400"
								alt="Article "
							/>
						{/if}
					</div>
				{:else}
					<div
						class=" col-span-2 md:col-span-1 card-hover card grid bg-white rounded-lg text-left shadow hover:shadow-md transition duration-300 overflow-hidden"
					>
						<button
							class="p-5 grid gap-1 grid-cols-2 text-left"
							on:click={() => {
								goto(`/articles/${article.slug}`);
							}}
						>
							<div class=" items-center text-gray-500 text-xs">
								<h2 class="font-bold text-2xl mb-2 text-gray-800">{article.title}</h2>
								<p class="text-gray-600 text-sm mb-4">{article.excerpt}</p>
								<!-- Avatar and author name -->
								<div class="flex items-center">
									<img
										class="w-8 h-8 rounded-full mr-2 object-cover"
										src={article.author?.avatar_url || 'https://via.placeholder.com/30'}
										alt="Author avatar"
									/>
									<span>{article.author?.username || 'Unknown Author'}</span>
								</div>
								<!-- <span class="mx-2">·</span> -->
								<!-- Reading time and publication date -->
								<div class="grid">
									<span>{article.read_time} min read</span>
									<!-- <span class="mx-2">·</span> -->
									<time datetime={article.published_date}>
										{new Date(article.published_date).toLocaleDateString()}
									</time>
								</div>
							</div>

							<!-- Placeholder for image if needed -->
							{#if article.featured_image}
								<img
									class="w-full h-full object-contain"
									src={article.featured_image}
									alt="Article"
								/>
							{/if}
						</button>
						<!-- Article tag -->
						<div class=" pl-5 pb-4">
							{#each article.tag || [1, 2, 3, 4, 5, 6, 7, 8, 9] as tag, i}
								<button
									class=" bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded z-20"
									on:click={() => {
										goto(
											`/category/${tagToCategory(article.tag[i])}/${sluglify(
												tagToTagName(article.tag[i])
											)}`
										);
									}}
								>
									{tagToTagName(article.tag[i])}
								</button>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	/* Additional styling if necessary */
</style>
