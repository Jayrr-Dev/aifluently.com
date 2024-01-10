<script lang="ts">
	export let data;
	import Icon from '@iconify/svelte';
	import { writable } from 'svelte/store';
	const colorStore = writable([
		'bg-blue-500/50',
		'bg-green-500/50',
		'bg-red-500/50',
		'bg-yellow-500/50'
	]);
	let currentColors: string | any[] = [];
	colorStore.subscribe((value) => (currentColors = value));

	interface set {
		title: string;
		subtitle: string;
		lesson: string;
		description: string;
		image?: string;
	}

	type setKeys =
		| '0'
		| '1'
		| '2'
		| '3'
		| '4'
		| '5'
		| '6'
		| '7'
		| '8'
		| '9'
		| '10'
		| '11'
		| '12'
		| '13'
		| '14'
		| '15';

	const keys: setKeys[] = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15'
	];

	interface setKey {
		[key: string]: set; // Add index signature to satisfy TypeScript
	}

	let banner = ['Fundamentals', 'Advance', 'Personality Typist', 'Type Relationships'];

	let links = [
		'dichotomies',
		'cognitive-functions',
		'personality-types',
		'personality-components',
		'individuation',
		'function-archetypes',
		'type-development',
		'history-of-typology',
		'function-identification',
		'function-behaviors',
		'function-elicitation',
		'individuation-mapping',
		'type-compatibility',
		'type-work-dynamics',
		'type-family-dynamics',
		'type-friend-dynamics'
	];

	let content: setKey = {
		0: {
			title: 'Dichotomies',
			subtitle: '1',
			lesson: 'Do live more in the Inner or Outer World?',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'Understand the fundamentals of the 4 dichotomies. <br /><br/> Station, Conception, Decisions, and Formation.'
		},
		1: {
			title: 'Cognitive Functions',
			subtitle: '2',
			lesson: 'The 8 Functions made easy',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'Learn about the 8 cognitive functions and how they work together to form a unique personality. <br /><br/> Fi, Fe, Ti, Te, Ni, Ne, Si, Se.'
		},
		2: {
			title: 'Personality Types',
			subtitle: '3',
			lesson: 'A deep dive to the 16 types',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'Learn about the 16 personality types and their unique characteristics, behaviors, and overall description.'
		},
		3: {
			title: 'Personality Components',
			subtitle: '4',
			lesson: 'Building blocks of personality',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'Examine the roles of the Ego, Aspiration, and Unconscious, along with the Super-Ego. Self, Shadow, Persona and Archetype.'
		},
		4: {
			title: 'Individuation',
			subtitle: '5',
			lesson: 'Under Construction',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				"Learn about each type's journey of development and how they first develop the self then grow to maturity, fulfillment and lastly enlightenment."
		},
		5: {
			title: 'Function Archetypes',
			subtitle: '6',
			lesson: 'Are you more Concrete or Abstract?',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'Learn about the Archetypal manifestation of each functions in the Psyche. From the Heroic Se to the Trickster Ti Etc.'
		},
		6: {
			title: 'Type Development',
			subtitle: '7',
			lesson: 'Do you begin with Logic or Emotions?',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'Learn about how functions develop over time and how they mature. How your level of stress develop different function from normal, tension, void, and breaking point.'
		},
		7: {
			title: 'History of Typology',
			subtitle: '7',
			lesson: 'Are you more Structured or Exploratory?',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				"Learn about the different theories and how they have shaped the field of typology. From the Carl Jung's original theory to the modern day theories of the MBTI and Socionics."
		},
		8: {
			title: 'Function Identification',
			subtitle: '8',
			lesson: 'Are you more Structured or Exploratory?',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description: 'Learn how to identify the different functions in speech and tone.'
		},
		9: {
			title: 'Function Behaviors',
			subtitle: '9',
			lesson: 'Are you more Structured or Exploratory?',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'Learn to spot the different behaviors of each functions and how they manifest in different individuals in differing degrees.'
		},
		10: {
			title: 'Function Elicitation',
			subtitle: '10',
			lesson: 'Function Elicitation',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'Learn how to elicit the different functions by asking the right questions. Specify designed to help you type others and yourself.'
		},
		11: {
			title: 'Individuation Mapping',
			subtitle: '11',
			lesson: 'Are you more Structured or Exploratory?',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description: 'Learn to read and deeply analyze the individuation map of other people.'
		},
		12: {
			title: 'Type Compatibility',
			subtitle: '12',
			lesson: 'Are you more Structured or Exploratory?',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'A deep dive in to the dynamics of type relationships and how each type can best be compatible with each other.'
		},
		13: {
			title: 'Type Work Dynamics',
			subtitle: '13',
			lesson: 'Are you more Structured or Exploratory?',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'Learn to navigate the different work dynamics of each type and how to best work with them.'
		},
		14: {
			title: 'Type Family Dynamics',
			subtitle: '14',
			lesson: 'Are you more Structured or Exploratory?',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'Learn about the dynamics of different types as parents, children, siblings, and spouses. To help you foster better relationships.'
		},
		15: {
			title: 'Type Friend Dynamics',
			subtitle: '15',
			lesson: 'Are you more Structured or Exploratory?',
			image:
				'https://lnyrlsnxptpsujomnyct.supabase.co/storage/v1/object/public/static/pexels-le-anh-tuan-15613086.jpg',
			description:
				'Learn to have more meaningful and deeper friendships with each type as well as how to best befriend them.'
		}
	};
</script>

<header class="bg-stone-500 text-center p-2">
	<div class="flex justify-center items-center h-32">
		<img class="h-full w-auto" src="/assets/logo/vertical-gradient.svg" alt="AI FLUENTLY logo" />
	</div>
</header>

<section
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 m-4 lg:mx-32 xl:mx-64"
>
	<div class="grid gap-4">
		<div>
			<div class="h-auto card max-w-full">
				<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
				<section class="p-4">
					<nav class="list-nav">
						<!-- (optionally you can provide a label here) -->
						<ul>
							<li>
								<a href="/elements/lists">
									<span class="">1.</span>
									<span class="badge bg-primary-500">-</span>
									<span class="flex-auto">Skeleton</span>
								</a>
							</li>
							<li>
								<a href="/elements/lists">
									<span class="">1.</span>
									<span class="badge bg-primary-500">-</span>
									<span class="flex-auto">Skeleton</span>
								</a>
							</li>
							<li>
								<a href="/elements/lists">
									<span class="">1.</span>
									<span class="badge bg-primary-500">-</span>
									<span class="flex-auto">Skeleton</span>
								</a>
							</li>
							<li>
								<a href="/elements/lists">
									<span class="">1.</span>
									<span class="badge bg-primary-500">-</span>
									<span class="flex-auto">Skeleton</span>
								</a>
							</li>
						</ul>
					</nav>
				</section>
			</div>
		</div>
		<div>
			<div class="h-auto card max-w-full">
				<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
				<section class="p-4">
					<nav class="list-nav">
						<!-- (optionally you can provide a label here) -->
						<ul>
							<li>
								<a href="/elements/lists">
									<span class="">1.</span>
									<span class="badge bg-primary-500">-</span>
									<span class="flex-auto">Skeleton</span>
								</a>
							</li>
						</ul>
					</nav>
				</section>
			</div>
		</div>
		<div class="h-auto card max-w-full">
			<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
			<section class="p-4">
				<nav class="list-nav">
					<!-- (optionally you can provide a label here) -->
					<ul>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
					</ul>
				</nav>
			</section>
		</div>
	</div>
	<div class="grid gap-4">
		<div class="h-auto card max-w-full">
			<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
			<section class="p-4">
				<nav class="list-nav">
					<!-- (optionally you can provide a label here) -->
					<ul>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
					</ul>
				</nav>
			</section>
		</div>
		<div class="h-auto card max-w-full">
			<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
			<section class="p-4">
				<nav class="list-nav">
					<!-- (optionally you can provide a label here) -->
					<ul>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
					</ul>
				</nav>
			</section>
		</div>
		<div class="h-auto card max-w-full">
			<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
			<section class="p-4">
				<nav class="list-nav">
					<!-- (optionally you can provide a label here) -->
					<ul>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
					</ul>
				</nav>
			</section>
		</div>
	</div>
	<div class="grid gap-4">
		<div class="h-auto card max-w-full">
			<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
			<section class="p-4">
				<nav class="list-nav">
					<!-- (optionally you can provide a label here) -->
					<ul>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
					</ul>
				</nav>
			</section>
		</div>
		<div class="h-auto card max-w-full">
			<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
			<section class="p-4">
				<nav class="list-nav">
					<!-- (optionally you can provide a label here) -->
					<ul>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
					</ul>
				</nav>
			</section>
		</div>
		<div class="h-auto card max-w-full">
			<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
			<section class="p-4">
				<nav class="list-nav">
					<!-- (optionally you can provide a label here) -->
					<ul>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
					</ul>
				</nav>
			</section>
		</div>
	</div>
	<div class="grid gap-4">
		<div class="h-auto card max-w-full">
			<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
			<section class="p-4">
				<nav class="list-nav">
					<!-- (optionally you can provide a label here) -->
					<ul>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
					</ul>
				</nav>
			</section>
		</div>
		<div class="h-auto card max-w-full">
			<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
			<section class="p-4">
				<nav class="list-nav">
					<!-- (optionally you can provide a label here) -->
					<ul>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
					</ul>
				</nav>
			</section>
		</div>
		<div class="h-auto card max-w-full">
			<header class="card-header bg-stone-500 text-center p-2">FREE AI TOOLS</header>
			<section class="p-4">
				<nav class="list-nav">
					<!-- (optionally you can provide a label here) -->
					<ul>
						<li>
							<a href="/elements/lists">
								<span class="">1.</span>
								<span class="badge bg-primary-500">-</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
					</ul>
				</nav>
			</section>
		</div>
	</div>
</section>
