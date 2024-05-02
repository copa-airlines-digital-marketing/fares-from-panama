<script lang="ts">
	import {
		dateIsInMonth,
		getDayAndDate,
		getDayOfWeekName,
		getMonthName,
		parseDate
	} from '$lib/public/utils';
	import { getContext } from 'svelte';
	import Icon from '$lib/components/site/icon.svelte';
	import Carret from '$lib/assets/icon-carret-down.svg?raw';
	import Isotipo from '$lib/assets/tarifas-viaja-panama-isotipo.svg?raw';
	import { isEmpty, isNotNil } from 'ramda';
	import { getDate } from 'date-fns';
	import { Tooltip } from 'bits-ui';
	import { fly } from 'svelte/transition';

	export let fare: ViajaPanamaFare;
	export let selected = false;
	export let dateKey: string;
	export let lowest: number;
	export let max: number;
	export let count: number;
	export let width: string = '100%';

	const labels = getContext<Record<string, string>>('moduleLabels');

	const calculateHeight = (max: number, current: number) =>
		current <= max ? (160 * current) / max : 10;
</script>

{#if !isEmpty(dateKey)}
	{@const date = parseDate(dateKey)}
	<span
		class="caret-transparent flex flex-col gap-8 text-14/20 self-end"
		class:text-grey-500={isEmpty(fare)}
		class:text-grey-600={!isEmpty(fare)}
	>
		{#if !isEmpty(fare)}
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger>
					<span
						class="block w-full group-hover:bg-secondary rounded-t-sm transition-colors shadow-tiny"
						class:bg-grey-100={isEmpty(fare)}
						class:bg-primary={!isEmpty(fare)}
						class:bg-red={selected}
						style="height: {calculateHeight(max, parseInt(fare.price))}px;"
					></span>
				</Tooltip.Trigger>
				<Tooltip.Content transition={fly} transitionConfig={{ y: -5, duration: 350 }}>
					<div class="bg-backgound-lightblue">
						<Tooltip.Arrow class="rounded-sm border-l border-t border-primary-ultralight" />
					</div>
					<div
						class="bg-backgound-lightblue border border-primary-ultralight font-heading px-8 py-4 rounded-2xl shadow-medium text-14/20"
					>
						{#if lowest === parseInt(fare.price)}
							<div class="flex gap-4 text-secondary">
								<Icon data={Isotipo} class="fill-current w-16"></Icon>
								{labels['lowestFare']}
							</div>
						{/if}
						<div class="text-right">{count} {labels['destinations']}</div>
						<div class="text-right">
							{labels['from']}
							{labels['currency']} ${fare.price}
						</div>
					</div>
				</Tooltip.Content>
			</Tooltip.Root>
		{:else}
			<span
				class="block bg-grey-100 w-full rounded-t-sm shadow-tiny"
				style="height: {calculateHeight(max, parseInt(fare.price))}px;"
			></span>
		{/if}
		<span class="">{getDate(date)}</span>
		<span class="uppercase">{getDayOfWeekName(date)}</span>
	</span>
{/if}

<style lang="postcss">
	.fare-card--month {
		grid-template-areas: 'month month month month' 'lowes froms price icons' '. crncy price icons';
		grid-template-columns: 1fr auto auto auto;
		grid-template-rows: auto 1fr auto;
	}

	@media (min-width: 600px) {
		.fare-card--month {
			grid-template-areas: 'month lowes froms price icons' 'month lowes crncy price icons';
			grid-template-columns: auto 1fr auto auto auto;
			grid-template-rows: 1fr auto;
		}
	}

	@media (min-width: 1180px) {
		.fare-card--month {
			grid-template-areas: 'month month month' 'lowes lowes lowes' '. froms price' '. crncy price';
			grid-template-columns: 1fr auto auto;
			grid-template-rows: auto 1fr auto auto;
		}
	}
</style>
