/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
  ],
  presets: [
    require('cmds-tailwind-styles'),
  ],
  theme: {
    extends:{
      colors: {
        red: '#e4002b'
      }
    }
  }
};

