<script>
	import { goto } from "@sapper/app";
	import Login from "../components/User/Login.svelte";

	function redirect() {
		goto("/");
	}
</script>

<Login on:close={redirect} />
