/** @type {import('tailwindcss').Config} */

export default {
	darkMode: ['selector', '[data-mode="dark"]'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	presets: [require('cmds-tailwind-styles')],
	theme: {
		extend: {
			screens: {
				calendar: '1180px',
				histogram: '1256px'
			},
			colors: {
				red: '#e4002b'
			},
			gridColumn: {
				'span-1': 'span 1 / span 1',
				'span-2': 'span 2 / span 2',
				'span-3': 'span 3 / span 3',
				'span-4': 'span 4 / span 4'
			},
			aspectRatio: {
				'2/1': '2 / 1',
				'4/3': '4 / 3',
				'4/1': '4 / 1',
				'3/4': '3 / 4'
			}
		}
	}
};
