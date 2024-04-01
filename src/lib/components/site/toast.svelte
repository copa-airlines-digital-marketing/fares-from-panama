<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte';

	export let data: Directus.TextContent;

	const {
		translations,
		icon: { code }
	} = data;

	const {
		elements: { content, title, description, close },
		helpers: { addToast },
		states: { toasts },
		actions: { portal }
	} = createToaster();
</script>

{#if translations}
	{@const {} = translations[0]}
	<div use:portal>
		{#each $toasts as { id, data } (id)}
			<div class="font-sans fontbo" use:melt={$content(id)}></div>
		{/each}
	</div>
{/if}
