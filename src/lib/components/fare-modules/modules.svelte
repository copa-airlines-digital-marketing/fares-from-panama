<script lang="ts">
	import { setContext } from 'svelte';
	import { CalendarModule } from './calendar';
	import PopularModule from './popular/popular-module.svelte';
	import BudgetModule from './budget/budget-module.svelte';
	import InterestModule from './interest/interest-module.svelte';
	import HistogramModule from './histogram/histogram-module.svelte';
	import { writable } from 'svelte/store';

	export let component_name: string;
	export let content: FareModule;

	const contenTranslation = content.translations[0];

	const validateTranslation = (value: unknown): value is FareModuleTranslations =>
		value != null && value instanceof Object && 'labels' in value;

	const toLabels = (value: FareModuleLabel[]) =>
		value.reduce(
			(a: Record<string, string>, c: FareModuleLabel) => ({ ...a, [c.name]: c.value }),
			{}
		);

	if (validateTranslation(contenTranslation))
		setContext('moduleLabels', toLabels(contenTranslation.labels));
	else setContext('moduleLabels', {});

	setContext('alertsShown', writable(0));

	setContext('maxAlerts', 3);
</script>

{#if component_name === 'budget'}
	<BudgetModule />
{:else if component_name === 'calendar'}
	<CalendarModule />
{:else if component_name === 'histogram'}
	<HistogramModule />
{:else if component_name === 'interest'}
	<InterestModule />
{:else if component_name === 'popular'}
	<PopularModule />
{:else}
	<div>⚠️ Unsupported Fare Module {component_name}</div>
{/if}
