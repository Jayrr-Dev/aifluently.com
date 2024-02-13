// tagsStore.ts
import type { ProductReviewData } from '$lib/types';
import { localStorageStore } from '@skeletonlabs/skeleton';
//import { writable } from 'svelte/store';
//import type { ProductReviewData } from '$lib/types';
// import { writable } from 'svelte/store';
//
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


//export const productReviewCache = writable<Record<string, ProductReviewData | null>>({});

export const productReviewCache = localStorageStore<ProductReviewData>('productReviewCache', { props: { productReviewData: {
    review_id: 0,
    product_id: 0,
    product_name: '',
    product_rating: 0,
    product_review: null,
    product_review_image: null,
    product_review_alt: null,
    product_pro: null,
    product_con: null,
    product_pricing: null,
    product_input_price: null,
    product_output_price: null,
    product_quality: null,
    product_description: null,
    tag_array: [],
    product_video: null,
    product_url: '',
    product_logo_alt: '',
    product_logo: null,
    product_table: {
        product_url: '',
        product_logo: ''
    }
}, relatedProducts: [] } });
// Initialize your store with default values
//export const tagsState = localStorageStore<TagsState>('tagsState', {});
export const categoryProductData = localStorageStore<TagsState>('categoryProductData', {});
export const main = localStorageStore<TagsState>('main', {});
export const business = localStorageStore<TagsState>('business', {});
export const education = localStorageStore<TagsState>('education', {});
export const entertainment = localStorageStore<TagsState>('entertainment', {});
export const technology = localStorageStore<TagsState>('technology', {});
export const creative = localStorageStore<TagsState>('creative', {});
export const lifestyle = localStorageStore<TagsState>('lifestyle', {});