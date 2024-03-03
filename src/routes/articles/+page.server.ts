import { supabase } from '$lib/supabaseClient';

export async function load() {
    // Fetch the latest article
    const { data: article, error: articleError } = await supabase
        .from('articles')
        .select('*')
        .order('published_date', { ascending: false })
      

    // If there's an error fetching the article, return an error response
    if (articleError) {
        console.error(articleError);
        return { status: 500, error: new Error('Failed to fetch the article') };
    }
  
    // Return the article and user data
    return {
        article,
      
    };
}
