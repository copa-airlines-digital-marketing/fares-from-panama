<script lang="ts">
	import { concatClasses } from '$lib/public/utils/concat-classes';
	import type { TextContentReturnSchema } from '$lib/public/utils/text-content';
	import { isEmpty } from 'ramda';
	import Icon from '../site/icon.svelte';
	import ArrowDown from '$lib/assets/icon-solar-arrow-down-bold.svg?raw';

	let className: string;
	export { className as class };

	export let content: TextContentReturnSchema;
</script>

<div class={concatClasses(className)}>
	{#if content.translations && !isEmpty(content.translations)}
		{@const { icon } = content}
		{@const { title, call_to_actions } = content.translations[0]}
		{#if call_to_actions && !isEmpty(call_to_actions)}
			{@const { link } = call_to_actions[0]}
			<a
				href={link}
				class={concatClasses(
					'bg-backgound-lightblue border-t-4 border-secondary gap-8 grid items-center my-4 p-8 py-16 rounded-lg shadow-medium text-common-white'
				)}
			>
				{#if icon}
					<span class="self-start text-primary">
						<Icon data={icon.code} class="square-32"></Icon>
					</span>
				{/if}
				<span class="text-grey-600">{title}</span>
				<span class="self-end text-primary">
					<Icon data={ArrowDown} class="square-24"></Icon>
				</span>
			</a>
		{:else}
			Este modulo necesita 1 call to action {content.name}
		{/if}
	{:else}
		No se encontraron traducciones para {content.name}
	{/if}
</div>

<style lang="postcss">
	.grid {
		grid-template-columns: auto 1fr auto;
	}
</style>
