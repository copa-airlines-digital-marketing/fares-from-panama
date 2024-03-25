<script lang="ts">
	import TextContent from '$lib/components/site/textContent/textContent.svelte';

	export let content: Directus.TextContent;
	export let component_name: string;
	export let theme: Directus.Theme;

	const { icon, icon_from_library, name } = content;

	const {
		title,
		description, //wysiwyg
		media, //directus asset id
		embed_media,
		call_to_actions
	} = content.translations[0];

	const logUnsupportedComponent = (component_name: string) => {
		console.log('Text Content - unsupported component: ', component_name, 'name:', name);
		return '';
	};
</script>

{#if component_name === 'textContent'}
	<TextContent {title} {description} {call_to_actions} {theme}></TextContent>
{:else}
	{logUnsupportedComponent(component_name)}
{/if}
