<script lang="ts">
	import { CMS_IMAGE_URL } from '$lib/public/constants';

	export let data;

	console.log(data);
</script>

<svelte:head>
	<title>{'Holi Mundo'}</title>
	<meta name="description" content="" />
	<link rel="shortcut icon" href="{CMS_IMAGE_URL}{data.content.favIcon.image}" />
</svelte:head>
