<script lang="ts">
	export let gridstart: number;
</script>

{#if gridstart === 1}
	<section
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 m-4 lg:mx-32 xl:mx-32"
	>
		<!-- row 1 -->
		<div class="h-full">
			<div class="card h-[500px] grid grid-cols-1">
				<!-- 1 -->
				<header class="card-header text-center p-2"><slot name="header1">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[400px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
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

		<!-- row 2 -->
		<div class="h-full grid gap-2">
			<div class="card h-[190px] grid grid-cols-1">
				<!-- 2 -->
				<header class="card-header text-center p-2"><slot name="header2">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[90px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list2">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>

			<div class="card h-[300px]">
				<!-- 3 -->
				<header class="card-header text-center p-2"><slot name="header3">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list3">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>

		<!-- row 3 -->
		<div class="h-full grid gap-2">
			<div class="card h-[300px]">
				<!-- 4 -->
				<header class="card-header text-center p-2"><slot name="header4">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list4">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
			<div class="card h-[190px]">
				<!-- 5 -->
				<header class="card-header text-center p-2"><slot name="header5">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[110px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list5">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>

		<!-- row 4 -->
		<div class="h-full">
			<div class="card h-[500px]">
				<!-- 6 -->
				<header class="card-header text-center p-2"><slot name="header6">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[400px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list6">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>
	</section>
{:else if gridstart === 7}
	<section
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 m-4 lg:mx-32 xl:mx-32"
	>
		<!-- row 1 -->
		<div class="h-full grid gap-2">
			<div class="card h-[300px]">
				<!-- 7 -->
				<header class="card-header text-center p-2"><slot name="header7">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list7">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
			<div class="card h-[190px]">
				<!-- 8 -->
				<header class="card-header text-center p-2"><slot name="header8">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[110px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list8">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>

		<!-- row 3 -->
		<div class="h-full grid gap-2">
			<div class="card h-[190px] grid grid-cols-1">
				<!-- 9 -->
				<header class="card-header text-center p-2"><slot name="header9">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[90px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list9">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>

			<div class="card h-[300px]">
				<!-- 10 -->
				<header class="card-header text-center p-2"><slot name="header10">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list10">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>
		<!-- row 5 -->
		<div class="h-full grid gap-2">
			<div class="card h-[300px]">
				<!-- 11 -->
				<header class="card-header text-center p-2"><slot name="header11">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list11">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
			<div class="card h-[190px]">
				<!-- 12 -->
				<header class="card-header text-center p-2"><slot name="header12">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[110px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list12">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>

		<!-- row 7 -->
		<div class="h-full grid gap-2">
			<div class="card h-[190px] grid grid-cols-1">
				<!-- 13 -->
				<header class="card-header text-center p-2"><slot name="header13">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[90px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list7">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>

			<div class="card h-[300px]">
				<!-- 14 -->
				<header class="card-header text-center p-2"><slot name="header14">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list14">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>
	</section>
{:else if gridstart === 15}
	<section
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 m-4 lg:mx-32 xl:mx-32"
	>
		<!-- row 1 -->
		<div class="h-full grid gap-2">
			<div class="card h-[300px]">
				<!-- 15 -->
				<header class="card-header text-center p-2"><slot name="header15">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list15">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
			<div class="card h-[190px]">
				<!-- 16 -->
				<header class="card-header text-center p-2"><slot name="header16">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[110px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list16">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>

		<!-- row 3 -->
		<div class="h-full grid gap-2">
			<div class="card h-[190px] grid grid-cols-1">
				<!-- 17 -->
				<header class="card-header text-center p-2"><slot name="header17">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[90px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list17">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>

			<div class="card h-[300px]">
				<!-- 18 -->
				<header class="card-header text-center p-2"><slot name="header18">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list18">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>
		<!-- row 5 -->
		<div class="h-full grid gap-2">
			<div class="card h-[300px]">
				<!-- 19 -->
				<header class="card-header text-center p-2"><slot name="header19">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list19">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
			<div class="card h-[190px]">
				<!-- 20 -->
				<header class="card-header text-center p-2"><slot name="header20">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[110px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list20">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>

		<!-- row 7 -->
		<div class="h-full grid gap-2">
			<div class="card h-[190px] grid grid-cols-1">
				<!-- 21 -->
				<header class="card-header text-center p-2"><slot name="header21">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[90px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list21">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>

			<div class="card h-[300px]">
				<!-- 22 -->
				<header class="card-header text-center p-2"><slot name="header22">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list22">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>
	</section>
{:else if gridstart === 23}
	<section
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 m-4 lg:mx-32 xl:mx-32"
	>
		<!-- row 1 -->
		<div class="h-full grid gap-2">
			<div class="card h-[300px]">
				<!-- 23 -->
				<header class="card-header text-center p-2"><slot name="header23">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list23">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
			<div class="card h-[190px]">
				<!-- 24 -->
				<header class="card-header text-center p-2"><slot name="header24">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[110px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list24">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>

		<!-- row 3 -->
		<div class="h-full grid gap-2">
			<div class="card h-[190px] grid grid-cols-1">
				<!-- 25 -->
				<header class="card-header text-center p-2"><slot name="header25">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[90px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list25">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>

			<div class="card h-[300px]">
				<!-- 26 -->
				<header class="card-header text-center p-2"><slot name="header26">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list26">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>
		<!-- row 5 -->
		<div class="h-full grid gap-2">
			<div class="card h-[300px]">
				<!-- 27 -->
				<header class="card-header text-center p-2"><slot name="header27">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list27">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
			<div class="card h-[190px]">
				<!-- 28 -->
				<header class="card-header text-center p-2"><slot name="header28">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[110px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list28">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>

		<!-- row 7 -->
		<div class="h-full grid gap-2">
			<div class="card h-[190px] grid grid-cols-1">
				<!-- 29 -->
				<header class="card-header text-center p-2"><slot name="header29">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[90px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list29">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>

			<div class="card h-[300px]">
				<!-- 30 -->
				<header class="card-header text-center p-2"><slot name="header30">-empty-</slot></header>
				<div class="flex justify-start">
					<section
						class="p-4 w-full h-[220px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary-500"
					>
						<ol>
							<slot name="list30">-empty-</slot>
						</ol>
					</section>
				</div>
				<div class="flex justify-center">
					<button class="btn btn-sm w-[85%] h-6 bg-warning-500 border-2 border-black">More</button>
				</div>
			</div>
		</div>
	</section>
{/if}
