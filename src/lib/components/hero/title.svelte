<script lang="ts">
	import { concatClasses } from '$lib/public/utils/concat-classes';
	import { isContentTranslation } from '../directus/utils';
	let className: string;
	export { className as class };
	export let content: TextContent;
</script>

<div class={concatClasses('grid grid-cols-subgrid grid-rows-subgrid', className)}>
	{#if content.translations[0] && isContentTranslation(content.translations)}
		{@const { title, media } = content.translations[0]}
		<picture class="col-start-1 col-full row-start-1 row-span-full">
			<source
				media="(min-width: 1367px)"
				srcset="https://cm-marketing.directus.app/assets/{media}?width=1920"
			/>
			<source
				media="(min-width: 960px)"
				srcset="https://cm-marketing.directus.app/assets/{media}?width=1368"
			/>
			<source
				media="(min-width: 600px)"
				srcset="https://cm-marketing.directus.app/assets/{media}?width=960"
			/>
			<img
				alt=""
				class="h-full object-cover w-full"
				src="https://cm-marketing.directus.app/assets/{media}?height=1088&width=612"
			/>
		</picture>
		<div
			class="bg-gradient-to-b col-start-1 col-full from-common-black row-start-1 row-span-full to-transparent to-30%"
		></div>
		<h1
			class="text-h1 sm:text-h1-sm md:text-h1-md lg:text-h1-lg caret-transparent col-start-2 font-heading font-heading-medium max-w-prose mb-huge mt-roomy mx-auto row-start-1 text-center text-common-white"
		>
			{title}
		</h1>
	{:else if !isContentTranslation(content.translations)}
		El contenido no cumple con los requisitos para renderizar
	{:else}
		No hay traducciones para el contenido: {content.name}
	{/if}
</div>
