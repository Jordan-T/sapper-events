import { EVENT_API_URL } from "../global";

export function getEvents() {
  const fetch = typeof window !== "undefined" ? window.fetch : this.fetch;

  return fetch(`${EVENT_API_URL}.json`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Could not fetch events!");
      }
      return res.json();
    })
    .then(data => {
      return Object.entries(data).map(([key, value]) => ({
        ...value,
        id: key
      }));
    });
}

export function getEvent(id) {
  const fetch = typeof window !== "undefined" ? window.fetch : this.fetch;

  return fetch(`${EVENT_API_URL}/${id}.json`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Could not fetch event!");
      }
      return res.json();
    })
    .then(data => {
      if (!data) {
        throw new Error("No event found!");
      }
      return {
        ...data,
        id: id
      };
    });
}

export function addEvent(event) {
  const fetch = typeof window !== "undefined" ? window.fetch : this.fetch;
  return fetch(`${EVENT_API_URL}.json`, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("An error occured, please try again!");
      }
      return res.json();
    })
    .then(data => {
      return {
        ...event,
        id: data.name
      };
    });
}

export function updateEvent(id, data) {
  const fetch = typeof window !== "undefined" ? window.fetch : this.fetch;
  return fetch(`${EVENT_API_URL}/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (!res.ok) {
      throw new Error("An error occured, please try again!");
    }
    return res.json();
  });
}

export function deleteEvent(id) {
  const fetch = typeof window !== "undefined" ? window.fetch : this.fetch;
  return fetch(`${EVENT_API_URL}/${id}.json`, {
    method: "DELETE"
  }).then(res => {
    if (!res.ok) {
      throw new Error("An error occured, please try again!");
    }
    return res.json();
  });
}
