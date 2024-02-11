
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';


export const lighttoggle = writable<boolean | undefined>(false);

interface tagicon {
	tagicon: string;
}


export const tagicon: Writable<string[]> = localStorageStore('tagicon', 
[
	"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js",
	"https://www.aitoolslist.com/icons/ai-image-generators.svg",
 ]);

