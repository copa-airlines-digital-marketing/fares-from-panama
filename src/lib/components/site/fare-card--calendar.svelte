<script lang="ts">
	import { dateIsInMonth, getShoppingEngingeURL, isBeforeToday } from '$lib/public/utils';
	import { getDate } from 'date-fns';

	export let monthOfFare: Date;
	export let date: Date;
	export let fare: Directus.Fare;
	export let labels: Record<string, string>;
	export let skeleton: boolean;

	const { price, taxes } = fare;

	const outOfMonth = isBeforeToday(date) || !dateIsInMonth(date, monthOfFare);
</script>

{#if skeleton}
	<div class="aspect-square bg-backgound-paper opacity-60 px-12 py-8 rounded-lg"></div>
{:else if outOfMonth}
	<div class="aspect-square bg-backgound-paper opacity-60 px-12 py-8 rounded-lg text-grey-700">
		<span>{getDate(date)}</span>
	</div>
{:else if fare.price === '-1'}
	<div>high price</div>
{:else if fare.return === '1990-02-12'}
	<div>opciones de otros dias</div>
{:else}
	<a class="aspect-square block w-full" href={getShoppingEngingeURL(fare)}>
		<span>{getDate(date)}</span>
		<span>{labels['return']}</span>
		<span>{labels['currency']}{price}</span>
		<span>{labels['taxes']}{taxes}</span>
	</a>
{/if}
