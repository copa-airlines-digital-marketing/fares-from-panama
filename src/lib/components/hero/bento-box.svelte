<script lang="ts">
	import Heading, { type HeadingType } from '../copa/typography/heading.svelte';
	import { isContentTranslation } from '../directus/utils';

	export let headingType: HeadingType;
	export let content: TextContent;
</script>

<div
	class="bg-primary-ultradark border-2 border-primary-dark flex flex-col justify-center p-8 lg:p-24 rounded-lg relative {$$restProps.class}"
>
	{#if content.translations[0] && isContentTranslation(content.translations)}
		{@const { title, description, media, call_to_actions } = content.translations[0]}
		<Heading type={headingType} style="text-common-white">
			{title}
		</Heading>
		<div class="wysiwyg text-grey-200 max-w-prose">
			{@html content.translations[0]?.description}
		</div>
	{:else if !isContentTranslation(content.translations)}
		El contenido no cumple con los requisitos para renderizar
	{:else}
		No hay traducciones para el contenido: {content.name}
	{/if}
</div>
