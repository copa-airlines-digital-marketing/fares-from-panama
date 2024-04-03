<script lang="ts">
	import { selectedDaysStore } from '$lib/public/store';
	import { createRadioGroup, createTooltip, melt } from '@melt-ui/svelte';
	import Icon from './icon.svelte';
	import IconHelpFilled from '$lib/assets/icon-help-filled.svg?raw';
	import { fly } from 'svelte/transition';

	export let text: string;
	export let theme: Directus.Theme;

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: { placement: 'top' },
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});
</script>

<button
	class="absolute -right-20 -top-8 {theme === 'light' ? 'text-common-white' : 'text-primary'}"
	type="button"
	use:melt={$trigger}
	aria-label="¿Qué es esto?"
>
	<Icon data={IconHelpFilled} class="size-16 fill-current"></Icon>
</button>
{#if $open}
	<div
		class="bg-backgound-lightblue max-w-prose p-8 rounded-lg shadow-medium z-10"
		transition:fly
		use:melt={$content}
	>
		<div use:melt={$arrow}></div>
		<p class="text-12/16 text-grey-600">{text}</p>
	</div>
{/if}
