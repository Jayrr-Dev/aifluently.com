<script lang="ts">
	import { goto } from '$app/navigation';
	export let data: { article: Article | null; user: User | null };
	import Backbtn from '$lib/svg/backbtn.svelte';

	interface User {
		id: string;
		username: string;
	}

	interface Article {
		post_id: number;
		title: string;
		content: string;
		author_id: string;
		published_date: string;
		updated_date: string;
		slug: string;
		excerpt: string;
		status: string;
		category_id: number;
		featured_image: string;
		meta_description: string;
		meta_keywords: string;
		author?: {
			username: string;
			avatar_url: string;
		};
	}

	$: article = data.article;
	$: username = data.user?.username;
</script>

<!-- <pre>
    {JSON.stringify(username, null, 2)}
</pre> -->

{#if article && username}
	<div class="max-w-xl mx-auto px-4 py-8 sm:max-w-2xl md:max-w-3xl">
		<button
			class="py-6"
			on:click={() => {
				goto('/articles');
			}}
		>
			<Backbtn />
		</button>
		<h1
			class="text-xl font-serif font-extrabold mb-4 leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
		>
			{article.title}
		</h1>
		<div class="flex items-center text-gray-600 text-sm mb-8">
			<img
				src={article.author?.avatar_url || 'https://via.placeholder.com/40'}
				alt="Author"
				class="rounded-full mr-2"
			/>
			<div>
				<span class="font-semibold">{username || 'Unknown Author'}</span><br />
				<span class="text-xs sm:text-sm"
					>{new Date(article.published_date).toLocaleDateString()}</span
				>
			</div>
		</div>
		<img
			src={article.featured_image || 'https://via.placeholder.com/800x400'}
			alt="Article Image"
			class="w-full h-auto mb-8"
		/>
		<p class="text-base mb-6 leading-relaxed font-serif sm:text-lg md:text-xl">
			{article.content}
		</p>
		<!-- More content here -->
	</div>
{/if}
