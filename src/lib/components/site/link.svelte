<script lang="ts">
	import Icon from '$lib/components/site/icon.svelte';

	export let link: Directus.Links;

	const { name, icon, url } = link;
	export let showicon: boolean | undefined | null = false;
	export let showtitle: boolean | undefined | null = true;
</script>

<a
	href={url}
	title={!showtitle ? name : null}
	target="_blank"
	class="text-current flex gap-4 min-w-32 h-full caret-transparent"
>
	{#if icon && showicon}
		<span>
			<Icon data={icon.code} class="fill-current h-full w-auto"></Icon>
		</span>
	{/if}
	{#if showtitle}
		<span>{name}</span>
	{/if}
</a>
