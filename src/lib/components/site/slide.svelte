<script lang="ts">
	let src: string;
	let loading: 'eager' | 'lazy' | null | undefined;
	let alt: string;
</script>

<picture>
	<source media="(min-width: 1236px)" srcset={src} />
	<source media="(min-width: 960px)" srcset={src} />
	<source media="(min-width: 600px)" srcset={src} />
	<img {loading} {src} {alt} class="w-full" />
</picture>
