<script context="module" lang="ts">
	export type HeadingType =
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'display-big'
		| 'display-normal'
		| 'display-small'
		| 'display-tiny';
</script>

<script lang="ts">
	export let type: HeadingType;
	export let style: string | null | undefined;
</script>

{#if type === 'h1'}
	<h1
		class="font-heading text-h1 sm:text-h1-sm md:text-h1-md lg:text-h1-lg font-heading-medium max-w-prose {style}"
	>
		<slot />
	</h1>
{:else if type === 'h2'}
	<h2
		class="font-heading text-h2 sm:text-h2-sm md:text-h2-md lg:text-h2-lg font-heading-bold max-w-prose {style}"
	>
		<slot />
	</h2>
{:else if type === 'h3'}
	<h3 class="font-heading text-h3 lg:text-h3-lg font-heading-bold max-w-prose {style}">
		<slot />
	</h3>
{:else if type === 'h4'}
	<h4 class="font-heading text-h4 font-heading-bold max-w-prose {style}">
		<slot />
	</h4>
{:else if type === 'display-big'}
	<div
		class="font-heading text-display-big sm:text-display-big-sm md:text-display-big-md lg:text-display-big-lg font-heading-bold max-w-prose {style}"
	>
		<slot />
	</div>
{:else if type === 'display-normal'}
	<div
		class="font-heading text-display-normal sm:text-display-normal-sm md:text-display-normal-md lg:text-display-normal-lg font-heading-bold max-w-prose {style}"
	>
		<slot />
	</div>
{:else if type === 'display-small'}
	<div
		class="font-heading text-display-small sm:text-display-small-sm md:text-display-small-md lg:text-display-small-lg max-w-prose {style}"
	>
		<slot />
	</div>
{:else if type === 'display-tiny'}
	<div class="font-heading text-display-tiny lg:text-display-tiny-lg max-w-prose {style}">
		<slot />
	</div>
{:else}
	<div>Heading type: {type} not valid</div>
{/if}
