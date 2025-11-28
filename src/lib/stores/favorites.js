import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Initialwert – nur im Browser lesen
let initial = [];

if (browser) {
  const stored = localStorage.getItem("favorites");
  initial = stored ? JSON.parse(stored) : [];
}

export const favorites = writable(initial);

// Nur im Browser speichern
if (browser) {
  favorites.subscribe((value) => {
    localStorage.setItem("favorites", JSON.stringify(value));
  });
}
