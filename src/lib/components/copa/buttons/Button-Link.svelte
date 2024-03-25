<script lang="ts">
	type ButtonStyles = 'rounded-solid-primary' | 'rounded-oultine-primary' | 'regular-solid-primary';
	export let link: string;
	export let style: ButtonStyles;
	export let target: string | null | undefined = undefined;

	const styleMap: Map<ButtonStyles, string> = new Map();

	styleMap.set(
		'regular-solid-primary',
		'bg-current border-current rounded py-4 px-16 outline-current text-primary hover:text-primary-ultradark active:text-primary focus:text-primary-ultradark'
	);
	styleMap.set(
		'rounded-solid-primary',
		'bg-current border-current rounded-[40px] py-12 px-16 outline-current text-primary hover:text-primary-ultradark active:text-primary focus:text-primary-ultradark'
	);
	styleMap.set(
		'rounded-oultine-primary',
		'bg-common-white border-current rounded-[40px] py-12 px-16 outline-current text-primary hover:bg-current active:bg-current focus:bg-current hover:text-primary-main active:text-primary-ultradark focus:text-primary-main'
	);

	const textStylesMap: Map<ButtonStyles, string> = new Map();
	textStylesMap.set('regular-solid-primary', 'text-common-white');
	textStylesMap.set('rounded-solid-primary', 'text-common-white');
	textStylesMap.set(
		'rounded-oultine-primary',
		'text-primary group-hover:text-common-white group-active:text-common-white group-focus:text-common-white'
	);
</script>

<a
	class="min-w-[73px] max-h-64 flex gap-8 border outline-1 outline-offset-2 justify-center group active:outline focus:outline transition-all caret-transparent text-center {styleMap.get(
		style
	)}"
	href={link}
	{target}
>
	<span class={textStylesMap.get(style)}>
		<slot />
	</span>
</a>
