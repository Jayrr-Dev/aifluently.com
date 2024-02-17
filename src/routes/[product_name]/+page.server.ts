// Server-side SvelteKit load function
import { supabase } from '$lib/supabaseClient';
import type { PageLoad } from '../$types';
import type { Product } from '$lib/types';

interface MyRouteParams {
  product_name: string; // Consider renaming this parameter to product_slug for clarity
}

export const load: PageLoad = async ({ params }) => {
  const { product_name: productSlug } = params as MyRouteParams;

  // Fetch current product data
  const { data: productReviewData, error: productDataError } = await supabase
    .from('product_review')
    .select(`
      *,
      product_table!product_review_product_slug_fkey(product_url, product_logo)
    `)
    .ilike('product_slug', productSlug)
    .maybeSingle();

  if (productDataError || !productReviewData) {
    console.error('Failed to fetch product review data for:', productSlug, productDataError);
    return {
      status: 500,
      props: {
        error: `Failed to load product review data for ${productSlug}.`
      },
    };
  }

  // Assuming productReviewData conforms to the Product type here
  const typedProductReviewData: Product = productReviewData as Product;

  // Fetch and filter related products
  const { data: allProductsData, error: allProductsError } = await supabase
    .from('product_review')
    .select(`
      product_name, product_slug, product_rating, product_review_image, product_review_alt, 
      tag_array, product_video, product_pro, product_con, product_pricing, 
      product_input_price, product_output_price,product_highlight,product_url
    `);

  let relatedProducts: Product[] = [];
  if (!allProductsError && allProductsData) {
    const currentTags = typedProductReviewData.tag_array;
    relatedProducts = allProductsData.map(product => product as unknown as Product).filter(product =>
      product.tag_array && currentTags.some(tag => product.tag_array.includes(tag))
    );
  } else {
    console.error('Failed to fetch related products:', allProductsError);
  }
  
  return {
    props: {
      productReviewData: typedProductReviewData,
      relatedProducts,
    },
  };
};