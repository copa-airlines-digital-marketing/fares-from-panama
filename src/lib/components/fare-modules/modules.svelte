<script lang="ts">
	export let component_name: string;
	export let content: FareModule;
</script>

{#if component_name === 'budget'}
	'Budget Module'
{:else if component_name === 'calendar'}
	'Calendar Module'
{:else if component_name === 'histogram'}
	'Histogram Module'
{:else if component_name === 'interest'}
	'Interest Module'
{:else if component_name === 'popular'}
	'Popular module'
{:else}
	<div>⚠️ Unsupported Fare Module {component_name}</div>
{/if}
