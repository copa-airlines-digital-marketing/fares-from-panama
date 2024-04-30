<script lang="ts">
	import { createRadioGroup, melt, type CreateRadioGroupProps } from '@melt-ui/svelte';
	import Tooltip from '../site/tooltip.svelte';
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let placeholder: string | undefined = undefined;
	export let options: string[];

	const dispatch = createEventDispatcher();

	const valueChange: CreateRadioGroupProps['onValueChange'] = ({ next }) => {
		dispatch('valueChange', next);
		return next;
	};

	const {
		elements: { root, item }
	} = createRadioGroup({
		orientation: 'horizontal',
		onValueChange: valueChange
	});
</script>

<div class="my-32" use:melt={$root}>
	<div class="mb-16 text-14/20 text-center text-grey-600 dark:text-common-white">
		<span class="relative">
			{label}
			{#if placeholder}
				<Tooltip text={placeholder}></Tooltip>
			{/if}
		</span>
	</div>
	<div class="grid auto-cols-auto grid-flow-col gap-16 justify-center">
		{#each options as option}
			<button
				use:melt={$item(option)}
				class="cursor-pointer text-20/24 border-2 caret-transparent border-current text-primary dark:text-common-white size-48 grid place-content-center rounded-full hover:border-secondary hover:bg-secondary hover:text-common-white transition-colors outline-2 outline-offset-4 focus:bg-secondary focus:border-secondary focus:outline focus:outline-secondary focus:text-common-white data-[state=checked]:bg-red data-[state=checked]:border-red data-[state=checked]:text-common-white data-[state=checked]:focus:outline-red"
			>
				<span class="cursor-pointer font-heading font-heading-bold">
					{option}
				</span>
			</button>
		{/each}
	</div>
</div>
