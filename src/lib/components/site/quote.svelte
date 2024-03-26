<script lang="ts">
	import { joinClasses } from '$lib/public/utils';

	export let theme: Directus.Theme;

	const descriptionTheme: Record<Directus.Theme, string> = {
		light: 'text-grey-600',
		dark: 'text-common-white'
	};
</script>

<div
	class={joinClasses(
		'font-heading text-center max-w-prose mx-auto text-display-tiny lg:text-display-tiny-lg',
		descriptionTheme[theme]
	)}
>
	<slot />
</div>
