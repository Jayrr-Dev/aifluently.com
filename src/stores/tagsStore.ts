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

// Define the structure of your store's state
interface TagsState {
    tagsLoaded: boolean;
    tags: string[];
    tagProductDetails: ProductDetail[][];
    fetched: boolean; // Flag to indicate if data has been fetched
}

// Initialize your store with default values using localStorageStore
export const tagsState = localStorageStore<TagsState>('tagsState', {
    tagsLoaded: false,
    tags: [],
    tagProductDetails: [[]],
    fetched: false,
});

// Exporting the store as is should be sufficient, as localStorageStore handles synchronization with local storage.
