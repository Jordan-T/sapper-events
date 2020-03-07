<script>
	import { createEventDispatcher } from "svelte";
	import Modal from "../UI/Modal.svelte";
	import Login from "./Login.svelte";

	const dispatch = createEventDispatcher();

	function onClose() {
		dispatch("cancel");
	}
</script>

<Modal title="Login" on:cancel>
	<Login on:close={onClose} />
</Modal>
