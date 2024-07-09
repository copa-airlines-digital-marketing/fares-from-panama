<script lang="ts">
	import { isEmpty } from 'ramda';
	import { getDaysContext } from './context';
	import NumberedRadio from './numbered-radio.svelte';

	export let sectionId: string;
	export let input: FormInput;

	const { label, placeholder } = input;
	const { days, selected } = getDaysContext();

	const onValueChange = ({ detail }: CustomEvent) => {
		if (window.dataLayer)
			window.dataLayer.push({ event: 'select_days', section: sectionId, days: detail });
		$selected[sectionId] = detail;
	};
</script>

{#if $days && !isEmpty($days)}
	<NumberedRadio
		{label}
		{placeholder}
		options={$days.map((value) => value.toString())}
		on:valueChange={onValueChange}
	></NumberedRadio>
{:else}
	<div class="animate-pulse dark:text-grey-100 my-roomy text-center">
		Cargando los días de viaje disponibles
	</div>
{/if}
