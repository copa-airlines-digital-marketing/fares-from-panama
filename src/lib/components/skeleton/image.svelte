<script lang="ts">
	import { concatClasses } from '$lib/public/utils/concat-classes';

	export let pulse = false;
	let className: string | null | undefined = undefined;
	export { className as class };
</script>

<div
	class={concatClasses(className, 'bg-grey-100 h-full rounded w-full')}
	class:animation-pulse={pulse}
></div>
