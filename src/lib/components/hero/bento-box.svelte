<script lang="ts">
	import Heading, { type HeadingType } from '../copa/typography/heading.svelte';
	import { isContentTranslation } from '../directus/utils';
	import Icon from '../site/icon.svelte';
	import ArrowDown from '$lib/assets/icon-solar-arrow-down-bold.svg?raw';
	import { valueIsDirectusIcon } from '$lib/public/utils';

	export let headingType: HeadingType;
	export let content: TextContent;
</script>

<div
	class="bg-primary-ultradark border-2 border-primary-dark cursor-default flex flex-col group justify-center gap-8 md:p-24 p-16 overflow-hidden rounded-lg relative {$$restProps.class}"
>
	{#if content.translations[0] && isContentTranslation(content.translations)}
		{@const { title, media, call_to_actions } = content.translations[0]}
		<img
			alt=""
			class="absolute h-full left-0 object-cover top-0 w-full"
			loading="lazy"
			src="https://cm-marketing.directus.app/assets/{media}?width=960"
		/>
		<div
			class="absolute bg-common-black/60 duration-300 group-hover:bg-common-black/15 h-full left-0 top-0 transition-colors w-full"
		></div>
		{#if content.icon && valueIsDirectusIcon(content.icon)}
			<div class="col-start-1 row-start-1 text-common-white z-0">
				<Icon data={content.icon.code} class="shrink-0 mt-4 size-24"></Icon>
			</div>
		{/if}
		<Heading
			type={headingType}
			style="caret-transparent col-start-1 row-start-2 text-common-white z-0"
		>
			{title}
		</Heading>
		{#if call_to_actions}
			<ul class="absolute h-full left-0 top-0 w-full">
				{#each call_to_actions as action}
					{@const { link, text } = action}
					<li class="h-full">
						<a
							href={link}
							title={text}
							class="flex h-full items-end justify-end md:p-24 p-24 text-common-white"
						>
							<Icon data={ArrowDown} class="size-32"></Icon>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	{:else if !isContentTranslation(content.translations)}
		El contenido no cumple con los requisitos para renderizar
	{:else}
		No hay traducciones para el contenido: {content.name}
	{/if}
</div>
