import * as sapper from "@sapper/app";
import userStore from "./stores/user-store";

sapper
	.start({
		target: document.querySelector("#sapper")
	})
	.then(() => {
		console.log("GET CLIENT");
		setTimeout(() => {
			userStore.setUser({
				id: "ABCD",
				name: "lorem"
			});
		}, 1000);
	});
