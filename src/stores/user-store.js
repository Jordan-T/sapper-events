import { writable } from "svelte/store";

const user = writable({
	loading: true,
	logged: false,
});

export default {
  subscribe: user.subscribe,
  setUser: newUser => {
    user.set({
			...newUser,
			loading: false,
			logged: true,
		})
  },
  unsetUser: () => {
    user.set({
			loading: false,
			logged: false,
		})
  }
};
