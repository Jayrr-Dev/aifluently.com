/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Writable } from 'svelte/store';
// import pkg from 'lodash'
// const { shuffle } = pkg
import { localStorageStore } from '@skeletonlabs/skeleton';
// import type { Writable } from 'svelte/store'
// import { browser } from '$app/environment'
interface aiTools {
	id: number;
	name: string;
	logo: string;
	url: string;
	description: string;
	rating: number;
	userrating: number;
}

interface aiCategories {
	id: number;
	name: string;
	tools: aiTools[];
}

export const lighttoggle: Writable<boolean> = localStorageStore('lighttoggle', false);

// Each category now has its own tools
export const aiCategories: Writable<aiCategories>[] = [
	{
		id: 1,
		name: 'Skeleton',
		tools: [
			{
				id: 1,
				name: 'xTool 1',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4,
				userrating: 4.5
			},
			{
				id: 2,
				name: 'xTool 2',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 3,
				name: 'xTool 3',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 4,
				name: 'xTool 4',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 5,
				name: 'xTool 5',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 6,
				name: 'xTool 6',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 1.5,
				userrating: 4.5
			},
			{
				id: 7,
				name: 'xTool 7',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 8,
				name: 'xTool 8',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			}
		]
	},
	{
		id: 2,
		name: 'Skeleton 2',
		tools: [
			{
				id: 1,
				name: 'xTool 1',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 2,
				name: 'xTool 2',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 3,
				name: 'xTool 3',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 4,
				name: 'xTool 4',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 5,
				name: 'xTool 5',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 6,
				name: 'xTool 6',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 7,
				name: 'xTool 7',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			},
			{
				id: 8,
				name: 'xTool 8',
				logo: 'https://api.iconify.design/arcticons/openai-chatgpt.svg',
				url: 'test.com',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				rating: 4.5,
				userrating: 4.5
			}
		]
	}
];
