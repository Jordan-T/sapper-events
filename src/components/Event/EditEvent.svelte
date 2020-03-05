<script>
	import events from "../../stores/events-store.js";
	import { createEventDispatcher } from "svelte";
	import TextInput from "../UI/TextInput.svelte";
	import Button from "../UI/Button.svelte";
	import Modal from "../UI/Modal.svelte";
	import { isEmpty, isValidEmail } from "../../helpers/validation.js";
	import { addEvent, updateEvent, deleteEvent } from "../../services/events";

	export let id = null;

	let name = "";
	let address = "";
	let email = "";
	let description = "";
	let imageUrl = "";

	if (id) {
		const unsubscribe = events.subscribe(items => {
			const selectedEvent = items.find(i => i.id === id);
			name = selectedEvent.name || "";
			address = selectedEvent.address || "";
			email = selectedEvent.contactEmail || "";
			description = selectedEvent.description || "";
			imageUrl = selectedEvent.imageUrl || "";
		});

		unsubscribe();
	}

	const dispatch = createEventDispatcher();

	$: nameValid = !isEmpty(name);
	$: addressValid = !isEmpty(address);
	$: descriptionValid = !isEmpty(description);
	$: imageUrlValid = !isEmpty(imageUrl);
	$: emailValid = isValidEmail(email);
	$: formIsValid =
		nameValid &&
		addressValid &&
		descriptionValid &&
		imageUrlValid &&
		emailValid;

	function submitForm() {
		const eventData = {
			name: name,
			description: description,
			imageUrl: imageUrl,
			contactEmail: email,
			address: address
		};

		if (id) {
			updateEvent(id, eventData).then(event => {
				console.log("UPDATE THE EVENT:", id, eventData);

				events.updateEvent(id, eventData);
			});
		} else {
			addEvent({
				...eventData,
				isFav: false
			}).then(event => {
				console.log("ADD THE EVENT:", event);

				events.addEvent(event);
			});
		}
		dispatch("save");
	}

	function onDeleteEvent() {
		deleteEvent(id).then(_ => {
			events.removeEvent(id);
		});
		dispatch("save");
	}

	function cancel() {
		dispatch("cancel");
	}
</script>

<style>
	form {
		width: 100%;
	}
</style>

<Modal title="Edit Event Data" on:cancel>
	<form on:submit={submitForm}>
		<TextInput
			id="name"
			label="Title"
			valid={nameValid}
			validityMessage="Please enter a valid name."
			value={name}
			on:input={event => (name = event.target.value)} />
		<TextInput
			id="address"
			label="Address"
			valid={addressValid}
			validityMessage="Please enter a valid address."
			value={address}
			on:input={event => (address = event.target.value)} />
		<TextInput
			id="imageUrl"
			label="Image URL"
			valid={imageUrlValid}
			validityMessage="Please enter a valid image url."
			value={imageUrl}
			on:input={event => (imageUrl = event.target.value)} />
		<TextInput
			id="email"
			label="E-Mail"
			type="email"
			valid={emailValid}
			validityMessage="Please enter a valid email address."
			value={email}
			on:input={event => (email = event.target.value)} />
		<TextInput
			id="description"
			label="Description"
			controlType="textarea"
			valid={descriptionValid}
			validityMessage="Please enter a valid description."
			bind:value={description} />
	</form>
	<div slot="footer">
		<Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
		<Button type="button" on:click={submitForm} disabled={!formIsValid}>
			Save
		</Button>
		{#if id}
			<Button type="button" on:click={onDeleteEvent}>Delete</Button>
		{/if}
	</div>
</Modal>
