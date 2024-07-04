import { supabase } from '$lib/supabaseClient';

export async function load() {
    // Directly fetch data from the database without caching
    const categoriesData = await Promise.all(
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

    return {
        props: { categoriesData: categoriesData.filter(data => data !== null) }
    };
}
