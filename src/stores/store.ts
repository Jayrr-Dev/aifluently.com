/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Writable } from 'svelte/store';
// import pkg from 'lodash'
// const { shuffle } = pkg
import { localStorageStore } from '@skeletonlabs/skeleton';
// import type { Writable } from 'svelte/store'
// import { browser } from '$app/environment'

export const lighttoggle: Writable<boolean> = localStorageStore('lighttoggle', false);
