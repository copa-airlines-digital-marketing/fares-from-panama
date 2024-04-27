<script lang="ts">
	import Icon from '../site/icon.svelte';
	import ArrowDown from '$lib/assets/icon-solar-arrow-down-bold.svg?raw';
	import { concatClasses } from '$lib/public/utils/concat-classes';

	export let href: string;
	export let icon: string;
	export let title: string;
	export let linkText: string;

	let className: string | null | undefined = undefined;

	export { className as class };
</script>

<a
	{href}
	class={concatClasses(
		className,
		'bg-backgound-paper border border-primary-faded group hover:border-primary focus:border-primary grid grid-cols-[auto_1fr_auto] gap-8 h-full items-center md:grid-cols-1 md:grid-rows-[min-content_1fr_auto] md:justify-items-center outline-none rounded-[64px] md:rounded-2xl px-16 py-12 transition-colors'
	)}
>
	<span
		class="bg-backgound-lightblue col-start-1 group-hover:text-primary group-focus:text-primary p-8 md:p-12 rounded-full text-secondary"
	>
		<Icon data={icon} class="square-24 md:size-44 transition-colors"></Icon>
	</span>
	<span
		class="font-heading col-start-2 md:col-start-1 font-heading-medium grow md:self-start md:text-center md:text-h3 text-14/20 text-primary-dark"
		>{title}</span
	>
	<span
		class="bg-backgound-lightblue col-start-3 flex group-hover:bg-primary group-hover:text-common-white group-focus:bg-primary group-focus:text-common-white justify-between md:col-start-1 md:w-full p-8 md:px-16 md:py-8 rounded-full text-secondary"
	>
		<span class="hidden md:inline text-primary md:text-current transition-colors">{linkText}</span>
		<Icon data={ArrowDown} class="square-24 transition-colors"></Icon>
	</span>
</a>

<style lang="postcss">
	.button-grid {
		grid-template-columns: min-content 1fr min-content;
	}

	.button-grid-md {
		grid-template-columns: 1fr;
	}
</style>
