// src\lib\supabase.ts
//The created Supabase client is then used in your application to interact with your Supabase project. This includes making queries, managing users, handling real-time subscriptions, and other tasks. The anonymous key is used to perform operations that don't require a specific authenticated user. Basically intializing the supabase client with the public url and the public anon key.

import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
