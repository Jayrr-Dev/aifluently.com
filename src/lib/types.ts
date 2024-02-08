export interface Category {
    id: number;
    name: string;
}
export type ProductDetail = {
    name: string;
    logo: string;
    rating: number;
    description: string;
    url: string;
    logoAlt: string;
};

export type TagWithProducts = {
    tagName: string;
    productNames: string[];
    productDetails: ProductDetail[];
};

export type CategoryData = {
    tagsLoaded: boolean;
    tags: string[];
    tagProductDetails: ProductDetail[][];
    fetched: boolean;
};

export type TagsState = {
    [categoryId: number]: CategoryData;
};

export interface CacheItem<T> {
    data: T;
    expiry: number;
}

export interface Category {
  id: number;
  name: string;
}