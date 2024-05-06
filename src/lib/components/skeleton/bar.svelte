<script lang="ts">
	import { concatClasses } from '$lib/public/utils/concat-classes';

	let className: string | null | undefined = undefined;

	export { className as class };
	export let pulse = false;
	export let width: string | null | undefined = undefined;
</script>

<div
	class={concatClasses(className, 'bg-grey-300 caret-transparent rounded h-12 my-4 ease-in-out')}
	class:animate-pulse={pulse}
	style="width: {width ? width : '100%'};"
></div>
