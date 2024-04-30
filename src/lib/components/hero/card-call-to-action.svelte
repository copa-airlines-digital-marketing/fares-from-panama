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
		'bg-gradient-to-t from-primary-ultradark group grid grid-cols-[auto_1fr_auto] gap-8 h-full items-center md:grid-cols-1 md:grid-rows-[min-content_1fr_auto] md:justify-items-center outline-none rounded-[64px] md:rounded-2xl px-16 py-12 md:py-24 to-primary transition-colors'
	)}
>
	<span class="col-start-1 group-hover:text-secondary group-focus:text-secondary text-common-white">
		<Icon data={icon} class="square-24 md:size-44 transition-colors"></Icon>
	</span>
	<span
		class="font-heading col-start-2 md:col-start-1 font-heading-medium grow md:self-start md:text-center md:text-h3 text-14/20 text-common-white"
		>{title}</span
	>
	<span
		class="border border-common-white col-start-3 flex group-hover:bg-common-white group-hover:text-secondary group-focus:bg-common-white group-focus:text-secondary justify-between md:col-start-1 md:w-full p-8 md:px-16 md:py-8 rounded-full text-common-white"
	>
		<span class="hidden md:inline text-common-white md:text-current transition-colors"
			>{linkText}</span
		>
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
