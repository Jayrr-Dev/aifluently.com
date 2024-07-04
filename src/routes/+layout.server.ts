// src/routes/+layout.server.ts

// The load function runs on the server before the component is created. It generates the data that the component needs, which can be anything from the results of a database query, JSON, or a error message. The result of the load function is passed to the component as load props.

// The root layout file (+layout.server.ts), which is special in that it wraps all other routes. This means the load function in this file will run for every page in your application.

// The session object typically contains information related to the current user's session or authentication state. It can include data such as the user's ID, username, role, authentication status, and any other relevant information

import type { RequestEvent } from '@sveltejs/kit'

export const load = async ({ locals: { getSession } }: RequestEvent) => {
	return {
		session: await getSession(),
	}
}
