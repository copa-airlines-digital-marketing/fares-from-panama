<script>
	import { CMS_IMAGE_URL } from '$lib/public/constants';
	import Toaster from '$lib/components/site/toast.svelte';
	import '../app.css';
</script>

<svelte:head>
	<link rel="shortcut icon" href="{CMS_IMAGE_URL}a0c674b2-eff8-4db3-b358-57355b9f9c5e" />
</svelte:head>

<Toaster />

<main>
	<slot />
</main>
