import { writable } from "svelte/store";

const events = writable([]);

const customEventsStore = {
	subscribe: events.subscribe,
	setEvents: eventArray => {
		events.set(eventArray);
	},
	addEvent: eventData => {
		const newEvent = {
			...eventData
		};
		events.update(items => {
			return [newEvent, ...items];
		});
	},
	updateEvent: (id, eventData) => {
		events.update(items => {
			const eventIndex = items.findIndex(i => i.id === id);
			const updatedEvent = { ...items[eventIndex], ...eventData };
			const updatedEvents = [...items];
			updatedEvents[eventIndex] = updatedEvent;
			return updatedEvents;
		});
	},
	removeEvent: id => {
		events.update(items => {
			return items.filter(i => i.id !== id);
		});
	}
};

export default customEventsStore;
