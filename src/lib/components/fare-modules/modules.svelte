<script lang="ts">
	import { setContext } from 'svelte';
	import CalendarFareModule from '../site/modules/calendar-fare-module.svelte';
	import { CalendarModule } from './calendar';

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
</script>

{#if component_name === 'budget'}
	'Budget Module'
{:else if component_name === 'calendar'}
	<CalendarModule></CalendarModule>
{:else if component_name === 'histogram'}
	'Histogram Module'
{:else if component_name === 'interest'}
	'Interest Module'
{:else if component_name === 'popular'}
	'Popular module'
{:else}
	<div>⚠️ Unsupported Fare Module {component_name}</div>
{/if}
