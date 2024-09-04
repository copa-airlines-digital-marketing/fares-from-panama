<script>
	import Toaster from '$lib/components/site/toast.svelte';
	import '../app.css';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	setContext('itineraryAlternatives', writable(null));
</script>

<Toaster />

<main>
	<slot />
</main>
