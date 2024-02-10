import { supabase } from '$lib/supabaseClient';
import NodeCache from 'node-cache';

// Initialize a cache with a standard TTL (time to live) in seconds
const cache = new NodeCache({ stdTTL: 600 }); // Caches data for 10 minutes

export async function load() {
    // Attempt to fetch from cache first
    let categoriesData = cache.get('categoriesData');
    if (!categoriesData) {
        // Data not in cache, fetch from database
        categoriesData = await Promise.all(
            Array.from({ length: 7 }, (_, i) => i + 1).map(async (categoryId) => {
                const { data, error } = await supabase
                    .from('aggregated_category_info')
                    .select('*')
                    .eq('category_id', categoryId)
                    .maybeSingle();

                if (error) {
                    console.error(`Failed to fetch category ${categoryId} data`, error);
                    return null;
                }

                return data;
            })
        );

        // Cache the newly fetched data
        cache.set('categoriesData', categoriesData);
    }
    
    return {
        props: { categoriesData: categoriesData || [] }
    };
}