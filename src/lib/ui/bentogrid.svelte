<script lang="ts">
</script>

<header class=" text-center p-2">
	<div class="flex justify-center items-center h-32">
		<img class="h-full w-auto" src="/assets/logo/horizontal-gradient.svg" alt="AI FLUENTLY logo" />
	</div>
</header>
<section
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 m-4 lg:mx-32 xl:mx-32"
>
	<!-- section -->
	<div class="h-full">
		<div class="card h-[500px] grid grid-cols-1">
			<header class="card-header text-center p-2"><slot name="header1">-empty-</slot></header>
			<div class="flex justify-start">
				<section
					class="p-4 w-full h-[420px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
				>
					<ol>
						<slot name="list1">-empty-</slot>
					</ol>
				</section>
			</div>
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
	</div>
	<div class="h-full grid gap-2">
		<div class="card h-[190px] grid grid-cols-1">
			<div class="flex justify-center">
				<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
			</div>
		</div>
		<div class="card h-[300px]"></div>
	</div>
	<div class="h-full grid gap-2">
		<div class="card h-[300px]">
			<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
		</div>
		<div class="card h-[190px]"></div>
	</div>
	<div class="h-full"><div class="card h-[500px]"></div></div>
</section>
