<script lang="ts">
	import Heading from '../copa/typography/heading.svelte';

	export let content: Directus.TextContent;
</script>

<Heading type="h2" style="text-common-white">
	{content.translations[0]?.title ?? '⚠️ Titulo no definido para: ' + content.name}
</Heading>
<div class="wysiwyg text-common-white max-w-prose">
	{@html content.translations[0]?.description}
</div>
