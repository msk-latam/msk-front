/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
	return ({ opacityVariable, opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${cssVar}), ${opacityValue})`;
		}
		if (opacityVariable !== undefined) {
			return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
		}
		return `rgb(var(${cssVar}))`;
	};
}

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],

	darkMode: 'class', // or 'media' or 'class',
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '4rem',
			},
			screens: {
				md: '1400px', // Change from 1536px to 1792px
			},
		},
		fontFamily: {
			display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
			body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
			sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
		},

		extend: {
			colors: {
				translucent: {
					blue: 'rgba(173, 216, 230, 0.5)', // Light Blue
				},
				primary: {
					50: customColors('--c-primary-50'),
					100: customColors('--c-primary-100'),
					200: customColors('--c-primary-200'),
					300: customColors('--c-primary-300'),
					400: customColors('--c-primary-400'),
					500: customColors('--c-primary-500'),
					6000: customColors('--c-primary-600'),
					700: customColors('--c-primary-700'),
					800: customColors('--c-primary-800'),
					900: customColors('--c-primary-900'),
				},
				secondary: {
					50: customColors('--c-secondary-50'),
					100: customColors('--c-secondary-100'),
					200: customColors('--c-secondary-200'),
					300: customColors('--c-secondary-300'),
					400: customColors('--c-secondary-400'),
					500: customColors('--c-secondary-500'),
					6000: customColors('--c-secondary-600'),
					700: customColors('--c-secondary-700'),
					800: customColors('--c-secondary-800'),
					900: customColors('--c-secondary-900'),
				},
				neutral: {
					50: customColors('--c-neutral-50'),
					100: customColors('--c-neutral-100'),
					200: customColors('--c-neutral-200'),
					300: customColors('--c-neutral-300'),
					400: customColors('--c-neutral-400'),
					500: customColors('--c-neutral-500'),
					6000: customColors('--c-neutral-600'),
					700: customColors('--c-neutral-700'),
					800: customColors('--c-neutral-800'),
					900: customColors('--c-neutral-900'),
				},
				'yellow-strong-post': '#FFC600',
				'yellow-post': '#FFEF00',
				'blue-post': '#759CFF',
				'orange-post': '#FF7728',
				'red-post': '#FF5D5E',
				'red-2': '#FF384F',
				'emerald-post': '#9AFFD6',
				'brown-post': '#E8874E',
				'teal-active': '#F3FEFC',
				'grey-course': '#575757',
				'violet-wash': '#6474A6',
				'violet-strong': '#374161',
				'violet-custom': '#9200ad',
				'violet-dark': '#392C35',
				'grey-disabled': '#CCD1DC',
				trial: '#FFD39C',
				'trial-strong': '#B47528',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				'lora-italic': ['var(--font-lora-italic)', 'sans-serif'],
				lora: ['Lora', 'sans-serif'],
				inter: ['var(--font-inter)', 'sans-serif'],
				raleway: ['var(--font-raleway)', 'sans-serif'],
			},
		},
	},
	variants: {
		extend: {
			animation: {
				'spin-slow': 'spin 3s linear infinite',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('tailwindcss-animated'),
		require('tailwind-scrollbar'),
		require('tailwind-scrollbar-hide'),
	],
};
