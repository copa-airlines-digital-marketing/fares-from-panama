/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
  ],
  presets: [
    require('cmds-tailwind-styles'),
  ],
  theme: {
    extend:{
      colors: {
        red: '#e4002b'
      },
      gridColumn: {
        'span-1':	'span 1 / span 1',
        'span-2':	'span 2 / span 2',
        'span-3':	'span 3 / span 3',
        'span-4':	'span 4 / span 4',
      }
    }
  }
};

