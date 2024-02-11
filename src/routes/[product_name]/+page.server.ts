// Server-side SvelteKit load function
import { supabase } from '$lib/supabaseClient';
import type { PageLoad } from '../$types';
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 600 }); // Cache TTL set to 10 minutes

interface MyRouteParams {
  product_name: string; // Consider renaming this parameter to product_slug for clarity
}

export const load: PageLoad = async ({ params }) => {
    const { product_name: productSlug } = params as MyRouteParams;
    let productReviewData, relatedProducts;
  
    // Attempt to fetch from cache first
    const cacheKey = `productData_${productSlug}`;
    const relatedCacheKey = `relatedProducts_${productSlug}`;
  

    // Check cache for current product data
    productReviewData = cache.get(cacheKey);

    // Fetch current product data if not in cache
    if (!productReviewData) {
      // Fetch current product data if not in cache
     const { data, error } = await supabase
      .from('product_review')
      .select(`
      *,
      product_table!product_review_product_slug_fkey(product_url, product_logo)
    `)
      .ilike('product_slug', productSlug)
      .maybeSingle();
      //console.log(data);
      
      if (error || !data) {
        console.error('Failed to fetch product review data for:', productSlug, error);
        return {
          status: 500,
          props: {
            error: `Failed to load product review data for ${productSlug}.`
          }
        };
      }
  
      productReviewData = data;
      cache.set(cacheKey, productReviewData); // Cache the current product data
    }
  
    // Check cache for related products
    relatedProducts = cache.get(relatedCacheKey);
    if (!relatedProducts) {
      // Fetch and filter related products if not in cache
      const { data: allProductsData, error: allProductsError } = await supabase
          .from('product_review')
          .select( "product_name, product_rating, product_review_image, product_review_alt, tag_array, product_video, product_pro, product_con, product_pricing, product_input_price, product_output_price", ); // Consider optimizing this query
  
      if (allProductsError) {
        console.error('Failed to fetch related products:', allProductsError);
        // Handle error
      } else {
        const currentTags = productReviewData.tag_array;
        relatedProducts = allProductsData.filter(product =>
            product.tag_array && currentTags.some((tag:number) => product.tag_array.includes(tag))
        );
  
        cache.set(relatedCacheKey, relatedProducts); // Cache the related products data
      }
    }
  
    // Return the fetched and cached data as props to the page
    return {
      props: {
        productReviewData,
        relatedProducts
      }
    };
  };