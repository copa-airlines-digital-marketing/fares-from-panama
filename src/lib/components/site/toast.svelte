<script lang="ts" context="module">
	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<Directus.TextContent>();

	export const addToast = helpers.addToast;
</script>

<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte';
	import Icon from '$lib/components/site/icon.svelte';
	import Heading from '$lib/components/copa/typography/heading.svelte';
	import IconCross from '$lib/assets/icon-cross.svg?raw';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
</script>

<div
	class="fixed right-0 top-0 z-20 m-8 flex flex-col items-end gap-4 md:bottom-0 md:top-auto"
	use:portal
>
	{#each $toasts as { id, data: { translations, icon: { code }, name } } (id)}
		<div
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			use:melt={$content(id)}
			class="rounded-lg bg-system-warning text-la shadow-md"
		>
			{#if translations[0]}
				{@const { title, description } = translations[0]}
				<div
					class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-start justify-between gap-4 p-8"
				>
					<div>
						<div class="flex gap-4 items-center my-8" use:melt={$title(id)}>
							<Heading type="h4" style="">
								{#if code}
									<span>
										<Icon data={code} class="size-24 inline"></Icon>
									</span>
								{/if}
								{title}
							</Heading>
						</div>
						<div use:melt={$description(id)}>
							{@html description}
						</div>
					</div>
					<button use:melt={$close(id)} aria-label="close notification">
						<Icon data={IconCross} class="size-24"></Icon>
					</button>
				</div>
			{:else}
				<div>⚠️ No translations for content: {name}</div>
			{/if}
		</div>
	{/each}
</div>
