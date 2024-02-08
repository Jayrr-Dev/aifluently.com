// tagsStore.ts
import { localStorageStore } from '@skeletonlabs/skeleton';
// import { writable } from 'svelte/store';
type ProductDetail = {
    name: string;
    logo: string;
    rating: number;
    description: string;
    url: string;
    logoAlt: string;
};


// Exporting the store as is should be sufficient, as localStorageStore handles synchronization with local storage.
interface CategoryData {
    tagsLoaded: boolean;
    tags: string[];
    tagProductDetails: ProductDetail[][];
    fetched: boolean;
}

interface TagsState {
    [categoryId: number]: CategoryData;
}

// Initialize your store with default values
export const tagsState = localStorageStore<TagsState>('tagsState', {});

export const main = localStorageStore<TagsState>('main', {});
export const business = localStorageStore<TagsState>('business', {});
export const education = localStorageStore<TagsState>('education', {});
export const entertainment = localStorageStore<TagsState>('entertainment', {});
export const technology = localStorageStore<TagsState>('technology', {});
export const creative = localStorageStore<TagsState>('creative', {});
export const lifestyle = localStorageStore<TagsState>('lifestyle', {});