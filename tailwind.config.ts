import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { neobrutalist } from './neobrutalist';

//** @type {import('tailwindcss').Config} */
export default {
	//darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		typography,
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require('tailwind-scrollbar')({ nocompatible: true }),
		skeleton({
			themes: {
				custom: [neobrutalist]
			}
		})
	]
} satisfies Config;
