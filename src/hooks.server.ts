// src/hooks.server.ts
// Creates a Supabase client within a shared load function in the root layout of a SvelteKit application.
// Initialize server hooks and supabase client & session data for database operations and session data access to Sveltekit Components.
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Set up the Supabase client
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	// Helper function to get the session
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	// Transform the page chunk HTML to include the theme
	return await resolve(event, {
		// filterSerializedResponseHeaders(name) {
		// 	return name === 'content-range';
		// },
		// transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	});
};
