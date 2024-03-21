<script lang="ts">
	type ButtonStyles = 'rounded-solid-primary' | 'rounded-oultine-primary';
	export let label: string;
	export let link: string;
	export let style: ButtonStyles;

	const styleMap: Record<ButtonStyles, string> = new Map([
		['rounded-solid-primary', ''],
		[
			'rounded-outline-primary',
			'bg-grey-50 border-current outline-current text-primary-main hover:bg-current active:bg-current focus:bg-current hover:text-primary-main active:text-primary-ultradark focus:text-primary-main'
		]
	]);

	const textStylesMap: Record<ButtonStyles, string> = new Map([
		['rounded-solid-primary', 'text-grey-50'],
		[
			'rounded-outline-primary',
			'text-primary-main group-hover:text-grey-50 group-active:text-grey-50 group-focus:text-grey-50'
		]
	]);
</script>

<a
	class="min-w-[73px] max-h-64 py-12 px-16 rounded-[40px] flex gap-8 border outline-1 outline-offset-2 justify-center group active:outline focus:outline transition-all"
	href={link}
>
	<span class={textStylesMap[style]}>
		{label}
	</span>
</a>
