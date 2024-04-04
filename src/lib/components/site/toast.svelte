<script lang="ts" context="module">
	const {
		elements: { content, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<Directus.TextContent>();

	export const addToast = helpers.addToast;
</script>

<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte';
	import Icon from '$lib/components/site/icon.svelte';
	import IconCross from '$lib/assets/icon-cross.svg?raw';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
</script>

<div
	class="auto-rows-auto container-grid fixed gap-8 justify-items-center left-1/2 m-8 top-0 -translate-x-1/2 z-50 w-full"
	use:portal
>
	{#each $toasts as { id, data: { translations, icon: { code }, name } } (id)}
		<div
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 350, y: '-100%' }}
			out:fly={{ duration: 350, y: '-100%' }}
			use:melt={$content(id)}
			class="bg-system-warning flex col-start-2 items-start max-w-[710px] p-16 rounded shadow-medium text-grey-700 w-full"
		>
			{#if translations[0]}
				{@const { description } = translations[0]}
				{#if code}
					<span class="mr-8">
						<Icon data={code} class="size-24 inline"></Icon>
					</span>
				{/if}
				<div class="wysiwyg" use:melt={$description(id)}>
					{@html description}
				</div>
				<button class="ml-32" use:melt={$close(id)} aria-label="close notification">
					<Icon data={IconCross} class="size-24"></Icon>
				</button>
			{:else}
				<div>⚠️ No translations for content: {name}</div>
			{/if}
		</div>
	{/each}
</div>
