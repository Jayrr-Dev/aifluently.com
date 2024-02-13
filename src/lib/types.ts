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
  

  export type ProductReview = {
    review_id: number;
    product_id: number;
    product_name: string;
    product_rating: number;
    product_review: string | null;
    product_review_image: string | null;
    product_review_alt: string | null;
    product_pro: string[] | null;
    product_con: string[] | null;
    product_pricing: string | null;
    product_input_price: number | null;
    product_output_price: number | null;
    product_quality: string | null;
    product_description: string | null;
    product_slug?: string; // Optional field for slug
    tag_array: number[]; // Array of tag IDs
    product_video: string | null;
    product_url: string | URL | undefined
    product_logo_alt: string | null;
    product_logo: string | null;
    product_table: {
      product_url: string;
      product_logo: string;
    };
  };
  
  // Defines the main type for the entire data structure including related products
  export type ProductReviewData = {
    props: {
      productReviewData: ProductReview;
    relatedProducts: ProductReview[];} // Array of related products
  };

  // Represents a single product within a tag's product table.
export interface Product {
  tag_array: number[];
  product_url: string | null;
  product_logo: string | null;
  product_name: string;
  product_type: string | null;
  date_recorded: string | null; // Use string for date representation, adjust as needed
  product_audio: string | null;
  product_video: string
  product_rating: number
  product_slug?: string; 
  product_logo_alt: string | null;
  product_screenshot: string | null;
  product_description: string | null;
  product_pricing_model: string | null;
  product_screenshot_alt: string | null;
}

// Represents each tag within the aggregated data, including a list of products.
export interface TagProducts {
  tag_desc: string;
  tag_name: string;
  product_table: Product[] | null; // Array of products or null if no products are associated.
}

// The top-level structure containing category ID and aggregated data.
export type CategoryWithAggregatedData = {
  category_id: number;
  aggregated_data: TagWithProducts[];
}