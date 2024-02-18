// Server-side SvelteKit load function
import { supabase } from '$lib/supabaseClient';
import type { PageLoad } from '../../../$types';

interface MyRouteParams {
  tag_slug: string;
  category_id: string;
}

export const load: PageLoad = async ({ params }) => {
  const { tag_slug: productSlug, category_id: categoryId } = params as MyRouteParams;

  // Fetch data for the specific category
  const { data: categoryData, error: categoryError } = await supabase
    .from('aggregated_category_info')
    .select('*')
    .eq('category_id', categoryId)
    .maybeSingle();

  if (categoryError) {
    console.error(`Failed to fetch category ${categoryId} data`, categoryError);
    return { props: { error: `Failed to fetch category ${categoryId} data` } };
  }

  return {
    props: {
      categoryData: categoryData,
      tag_slug: productSlug,
    },
  };
};
