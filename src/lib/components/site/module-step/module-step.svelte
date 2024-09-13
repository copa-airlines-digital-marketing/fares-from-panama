<script lang="ts">
	import { getContext } from 'svelte';
	import Tooltip from '../tooltip.svelte';
	import type { Writable } from 'svelte/store';
	import { getDaysContext } from '$lib/components/days';

	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let section: string;
	const { selected } = getDaysContext();

	const sectionSteps: Writable<unknown[]> = getContext('sectionSteps');

	const currentLength = $sectionSteps.length + 1;

	$sectionSteps.push(currentLength);
</script>

<div class="relative w-fit mx-auto">
	{#if !$selected[section]}
		<div class="square-12 -translate-x-3/4 rounded-full bg-red animate-ping absolute"></div>
	{/if}
	<p
		class="text-center mx-auto text-24/32 mt-32 mb-16 font-heading font-heading-medium text-primary-dark dark:text-primary-faded"
	>
		{#if title}
			{currentLength}.
			{title}
		{/if}
	</p>
	{#if description}
		<Tooltip text={description}></Tooltip>
	{/if}
</div>
