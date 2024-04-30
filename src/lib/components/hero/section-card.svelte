<script lang="ts">
	import { concatClasses } from '$lib/public/utils/concat-classes';
	import type { TextContentReturnSchema } from '$lib/public/utils/text-content';
	import { isEmpty } from 'ramda';
	import CardCallToAction from './card-call-to-action.svelte';

	let className: string | null | undefined = undefined;
	export { className as class };

	export let content: TextContentReturnSchema;

	const isInvalidContentForCard = (content: TextContentReturnSchema) => {
		const { icon, translations } = content;
		if (!translations || isEmpty(translations))
			return `No se encontraron traducciones para ${content.name}`;

		if (!icon) return `El contenido (${content.name}) necesita un icono asociado`;

		if (!translations[0].title)
			return `El contenido (${content.name}) en la traduccion necesita un titulo`;

		const callToActions = translations[0].call_to_actions;

		if (!callToActions || isEmpty(callToActions))
			return `El contenido (${content.name}) requiere un call to action`;

		return {
			icon: icon.code,
			title: translations[0].title,
			href: callToActions[0].link,
			linkText: callToActions[0].text
		};
	};

	$: validateContent = isInvalidContentForCard(content);
</script>

<li class={concatClasses(className)}>
	{#if typeof validateContent === 'object'}
		{@const { href, icon, linkText, title } = validateContent}
		<CardCallToAction {icon} {href} {linkText} {title}></CardCallToAction>
	{:else}
		{validateContent}
	{/if}
</li>
