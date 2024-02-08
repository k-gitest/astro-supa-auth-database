import { writable } from 'svelte/store';

export const userData = writable(null);

export const setUserData = (data) => {
  userData.set(data);
};
