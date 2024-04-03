<script lang="ts">
	import { modulesStore } from '$lib/public/store';
	import BudgetModule from '../site/modules/budget-module.svelte';
	import CalendarModule from '../site/modules/calendar-module.svelte';
	import InterestModule from '../site/modules/interest-module.svelte';
	import PopularModule from '../site/modules/popular-module.svelte';

	export let component_name: string;
	export let item: Directus.FareModule;
</script>

{#if component_name === 'budget'}
	<BudgetModule fares={$modulesStore.popular} module={item}></BudgetModule>
{:else if component_name === 'calendar'}
	<CalendarModule
		months={$modulesStore.calendarMonths}
		calendar={$modulesStore.calendar}
		module={item}
	></CalendarModule>
{:else if component_name === 'histogram'}
	histograma
{:else if component_name === 'interest'}
	<InterestModule
		interestFares={$modulesStore.interests}
		interestLowest={$modulesStore.interestNames}
		module={item}
	></InterestModule>
{:else if component_name === 'popular'}
	<PopularModule fares={$modulesStore.popular} module={item}></PopularModule>
{:else}
	<div>⚠️ Unsupported Fare Module {component_name}</div>
{/if}
