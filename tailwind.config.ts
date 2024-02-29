import { fontFamily } from 'tailwindcss/defaultTheme';
import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { neobrutalist } from './neobrutalist';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/**/*.{html,js,svelte,ts}',
        join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
    ],
    safelist: ['dark'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                // Add your color configurations here
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            fontFamily: {
                sans: [...fontFamily.sans]
            }
        }
    },
    plugins: [
        forms,
        typography,
        skeleton({
            themes: {
                custom: [neobrutalist]
            }
        }),
        require('@tailwindcss/forms')
    ]
};

export default config;
