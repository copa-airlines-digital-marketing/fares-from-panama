<script lang="ts">
	import { concatClasses } from '$lib/public/utils/concat-classes';
	import { onMount } from 'svelte';
	import { isContentTranslation } from '../directus/utils';
	let className: string;
	export { className as class };
	export let content: TextContent;

	export let image: HTMLImageElement;
	export let overlay: HTMLDivElement;

	const removeLoading = () => {
		if (!!image) image.setAttribute('data-loaded', 'true');
		if (!!overlay) overlay.setAttribute('data-loaded', 'true');
	};

	onMount(() => {
		if (image.complete) {
			removeLoading();
			return;
		}

		image.addEventListener('load', removeLoading, false);
	});
</script>

<div class={concatClasses('grid grid-cols-subgrid grid-rows-subgrid', className)}>
	{#if content.translations[0] && isContentTranslation(content.translations)}
		{@const { title, media } = content.translations[0]}
		<div
			class="col-start-1 col-full grid grid-cols-1 grid-rows-1 row-start-1 row-span-full bg-cover"
			style="background-image: url('https://cm-marketing.directus.app/assets/{media}?width=50');"
		>
			<picture class="col-start-1 row-start-1">
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
					bind:this={image}
					class="data-[loaded='true']:opacity-100 h-full object-cover opacity-0 transition-opacity duration-500 w-full"
					src="https://cm-marketing.directus.app/assets/{media}?height=1088&width=612"
				/>
			</picture>
			<divs
				bind:this={overlay}
				class="animate-pulse data-[loaded='true']:animate-none bg-common-black/40 col-start-1 ease-in-out h-full row-start-1 w-full"
			></divs>
		</div>
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
