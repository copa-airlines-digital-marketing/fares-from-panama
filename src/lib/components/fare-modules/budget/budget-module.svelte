<script lang="ts">
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import { getContext } from 'svelte';
	import { isEmpty, isNotNil } from 'ramda';
	import StatusWrapper from '$lib/components/skeleton/status-wrapper.svelte';
	import { getShoppingEngingeURL } from '$lib/public/utils';
	import BudgetSkeleton from './budget-skeleton.svelte';
	import { getBudgetContext } from '$lib/components/budget/context';
	import { fly } from 'svelte/transition';
	import { quintIn } from 'svelte/easing';

	const { all: destinations } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const selectedBudget = getBudgetContext();
	const modules = getFareModulesContext();

	const section: string = getContext('section');

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: budget = $modules.budget;

	$: selectedStayOfSection = $selectedStay[section];

	$: maxShow = $selectedBudget ? 12 : 12;

	const addShowMax = () => (maxShow += 12);
</script>

{#if isNotNil($selectedBudget) && !!selectedStayOfSection && isNotNil(budget) && !isEmpty(budget)}
	{@const fares = Object.values(budget[parseInt(selectedStayOfSection)])
		.sort((a, b) => parseInt(a.price) - parseInt(b.price))
		.filter((fare) => parseInt(fare.price) <= $selectedBudget)}
	{#key $selectedBudget}
		<div
			in:fly={{ easing: quintIn, x: 5 }}
			class="flex font-heading font-heading-medium justify-end px-8 text-grey-600"
		>
			{fares.length}
			{labels['destinations']}
		</div>
	{/key}
	<ul
		class="auto-rows-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-tiny"
	>
		{#each fares as fare, i (i)}
			{@const { destination, departure, price, taxes } = fare}
			{@const image = $destinations[destination].main_image}
			{#if i < maxShow}
				<li in:fly={{ duration: 350, y: '-100%' }} out:fly={{ duration: 350, y: '-100%' }}>
					<a
						class="aspect-video sm:aspect-[4/3] fare-card--destination-image font-heading grid gap-x-4 h-full group overflow-hidden rounded-2xl shadow-tiny text-12/16 text-common-white w-full group"
						href="#fechas"
					>
						<img
							loading="lazy"
							class="[grid-area:image] object-cover h-full w-full"
							src="https://cm-marketing.directus.app/assets/{image}?width=800&height=600&fit=cover"
							alt=""
						/>
						<span
							class="[grid-area:image] bg-common-black/40 group-hover:bg-red group-focus:bg-red transition-colors"
						></span>
						<span class="col-[content] font-heading-medium row-[dest]">
							<span class="text-24/32"
								>{$destinations[destination]?.translations[0]?.name ?? 'not found'}</span
							>
							({destination}),
							<span class="uppercase"
								>{$destinations[destination]?.country?.code ?? 'not found'}</span
							>
						</span>
						<span class="col-[content] mb-8 row-[date]">
							{labels['roundTrip']}
						</span>
						<span class="col-[detail] justify-self-end row-[labl] self-end">{labels['from']}</span>
						<span class="col-[detail] justify-self-end row-[crcy] self-start"
							>{labels['currency']}</span
						>
						<span class="col-[price] font-heading-bold row-[labl_/_crcy] text-32/40">${price}</span>
						<span
							class="col-[detail_/_price] row-[cta] text-16/24 flex justify-end items-center gap-4 font-heading-bold translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
						>
							{labels['viewDates']}
						</span>
					</a>
				</li>
			{/if}
		{/each}
	</ul>
	{#if fares.length > 12 && maxShow < fares.length}
		<div class="flex justify-center my-tiny" transition:fly>
			<button class="button text-common-white" on:click={addShowMax} type="button">
				{labels['showMoreDestinations']}
			</button>
		</div>
	{/if}
{:else}
	<div class="relative">
		<BudgetSkeleton pulse={isEmpty(budget)}></BudgetSkeleton>
		<StatusWrapper
			name={section}
			{labels}
			theme={'light'}
			fares={isEmpty($modules)}
			days={!$selectedStay[section]}
			budget={!$selectedBudget}
			noFares={!!selectedStayOfSection && !!budget && !budget[parseInt(selectedStayOfSection)]}
		></StatusWrapper>
	</div>
{/if}

<style lang="post-css">
	.fare-card--destination-image {
		grid-template-columns: [image-start] 8px [content-start detail-start] 1fr [detail-end price-start] auto [content-end price-end] 8px [image-end];
		grid-template-rows:
			[image-start] 8px
			[dest-start] auto
			[dest-end date-start] auto
			[date-end]1fr
			[labl-start] auto
			[labl-end crcy-start] auto
			[crcy-end cta-start] auto
			[cta-end] 8px
			[image-end];
	}
</style>
