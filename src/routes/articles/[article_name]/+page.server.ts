import { supabase } from '$lib/supabaseClient';

export async function load({params}) {
    //get params
    const { article_name } = params;
    // Fetch the user associated with the article

    const { data: article, error: articleError } = await supabase
        .from('articles')
        .select('*')
        .match({ slug: article_name })
        .limit(1)
        .single();

    // If there's an error fetching the article, return an error response
    if (articleError) {
        console.error(articleError);
        return { status: 500, error: new Error('Failed to fetch the article') };
    }


    const { data: user, error: userError } = await supabase
        .from('user_profiles')
        .select('*')
        .match({ id: article.author_id })
        .limit(1)
        .single();

    // If there's an error fetching the user, return an error response
    if (userError) {
        console.error(userError);
        return { status: 500, error: new Error('Failed to fetch the user') };
    }

    // Return the article and user data
    return {
        article,
        user,
        article_name
    };
}