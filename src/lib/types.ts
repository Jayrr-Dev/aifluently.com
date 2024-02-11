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

export interface Product {
    product_name: string;
    product_rating: number;
    product_review_image: string;
    product_review_alt: string;
    tag_array: number[];
    product_video: string;
    product_pro: string;
    product_con: string;
    product_pricing: string;
    product_input_price: number;
    product_output_price: number;
  }
  