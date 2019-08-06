import {Axios} from "./axios";

/**
 * Low-level api wrapper
 */
export class API {

	axios: Axios;

	constructor(url: string) {
		this.axios = new Axios(url);
	}

	newDeck(query: string) {
		return this.axios.get(`/decks/new${query}`);
	}
	getDeck(id: string, password: string) {
		return this.axios.get(`/decks/${id}?${password}`);
	}
	shuffleDeck(id: string, password: string) {
		return this.axios.get(`/decks/${id}/shuffle?${password}`)
	}
	drawDeck(id: string, amount: number, password: string) {
		return this.axios.get(`/decks/${id}/draw?amount=${amount}&${password}`);
	}
	drawBottomDeck(id: string, amount: number, password: string) {
		return this.axios.get(`/decks/${id}/draw/bottom?amount=${amount}&${password}`);
	}
	getPile(id: string, name: string, password: string) {
		return this.axios.get(`/decks/${id}/piles/${name}?${password}`);
	}
	addPile(id: string, name: string, cards: string, password: string) {
		return this.axios.get(`/decks/${id}/piles/${name}/add?${cards}${password}`);
	}
	shufflePile(id: string, name: string, password: string) {
		return this.axios.get(`/decks/${id}/piles/${name}/shuffle?${password}`)
	}
	drawPile(id: string, name: string, amount: number, password: string) {
		return this.axios.get(`/decks/${id}/piles/${name}/draw?amount=${amount}&${password}`);
	}
	drawBottomPile(id: string, name: string, amount: number, password: string) {
		return this.axios.get(`/decks/${id}/piles/${name}/draw/bottom?amount=${amount}&${password}`)
	}
}
