<script lang="ts">
	import Hero from '$lib/components/hero/hero.svelte';
	import { getBackgroundColorMap } from '$lib/public/utils';
	import SectionContent from './sectionContent.svelte';

	export let section: Directus.Section;

	const {
		background_color,
		content_horizontal_alignment,
		content_horizontal_distribution,
		content_vertical_alignment,
		content_vertical_distribution,
		content_spacing,
		horizontal_behaviour,
		landmark,
		section_content,
		section_id
	} = section;

	const hbClasses =
		horizontal_behaviour === 'contained' ? 'container mx-auto' : 'w-full max-w-full';

	const sectionVerticalSpacing: Record<Directus.ContentSpacing, string> = {
		none: 'py-0',
		minimal: 'py-8',
		tiny: 'py-16',
		petit: 'py-24',
		normal: 'py-32',
		roomy: 'py-32 sm:py-40 md:py-48 lg:py-56',
		spacious: 'py-40 sm:py-48 md:py-56 lg:py-64',
		big: 'py-56 sm:py-64 md:py-72 lg:py-80',
		huge: 'py-72 sm:py-88 md:py-96 lg:py-112'
	};

	const gridSystem =
		'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-min gap-16 md:gap-24';

	const alignItems: Record<Directus.VerticalAlignment, string> = {
		top: 'align-start',
		center: 'align-center',
		bottom: 'align-end',
		stretch: 'align-stretch',
		baseline: 'align-baseline'
	};

	const alignContent: Record<Directus.VerticalAlignment | Directus.ContentDistribution, string> = {
		top: 'content-start',
		center: 'content-center',
		bottom: 'content-end',
		stretch: 'content-stretch',
		baseline: 'content-baseline',
		space_around: 'content-around',
		space_between: 'content-between',
		space_evenly: 'content-evenly'
	};

	const justifyItems: Record<Directus.HorizontalAlignment, string> = {
		left: 'justify-items-start',
		center: 'justify-items-center',
		right: 'justify-items-end',
		stretch: 'justify-items-stretch'
	};

	const justifyContent: Record<
		Directus.HorizontalAlignment | Directus.ContentDistribution,
		string
	> = {
		left: 'justify-start',
		center: 'justify-center',
		right: 'justify-end',
		stretch: 'justify-stretch',
		space_around: 'justify-around',
		space_between: 'justify-between',
		space_evenly: 'justify-evenly'
	};

	const contentSpacingClass = [
		alignItems[content_vertical_alignment],
		alignContent[content_vertical_distribution],
		justifyItems[content_horizontal_alignment],
		justifyContent[content_horizontal_distribution]
	]
		.filter((value: string | undefined) => value)
		.join(' ');
</script>

{#if landmark === 'aside'}
	<aside id={section_id} class={sectionVerticalSpacing[content_spacing]}>
		<SectionContent contents={section_content}></SectionContent>
	</aside>
{:else if landmark === 'footer'}
	<footer id={section_id} class="bg-primary {sectionVerticalSpacing[content_spacing]}">
		<div class="container mx-auto {gridSystem} {contentSpacingClass}">
			<SectionContent contents={section_content}></SectionContent>
		</div>
	</footer>
{:else if landmark === 'header'}
	<header id={section_id}>
		<SectionContent contents={section_content}></SectionContent>
	</header>
{:else if landmark === 'hero'}
	<div id={section_id}>
		<Hero content={section_content}></Hero>
	</div>
{:else if landmark === 'regular'}
	<div
		id={section_id}
		class="{sectionVerticalSpacing[content_spacing]} {background_color
			? getBackgroundColorMap(background_color.name)
			: ''}"
	>
		<div class="{hbClasses} {contentSpacingClass}">
			<SectionContent contents={section_content}></SectionContent>
		</div>
	</div>
{:else if landmark === 'section'}
	<section
		id={section_id}
		class="{sectionVerticalSpacing[content_spacing]} {background_color
			? getBackgroundColorMap(background_color.name)
			: ''}"
	>
		<div class="{hbClasses} {contentSpacingClass}">
			<SectionContent contents={section_content}></SectionContent>
		</div>
	</section>
{:else}
	<div>Insupported section landmark</div>
{/if}
