import Axios from "./axios";

class API {

	axios: Axios;

	constructor(url) {
		this.axios = new Axios(url);
	}

	newDeck(query: String) {
		return this.axios.get(`/decks/new${query}`);
	}
	getDeck(id: String, password: String) {
		return this.axios.get(`/decks/${id}?${password}`);
	}
	shuffleDeck(id: String, password: String) {
		return this.axios.get(`/decks/${id}/shuffle?${password}`)
	}
	drawDeck(id: String, amount: Number, password: String) {
		return this.axios.get(`/decks/${id}/draw?amount=${amount}&${password}`);
	}
	drawBottomDeck(id: String, amount: Number, password: String) {
		return this.axios.get(`/decks/${id}/draw/bottom?amount=${amount}&${password}`);
	}
	getPile(id: String, name: String, password: String) {
		return this.axios.get(`/decks/${id}/piles/${name}?${password}`);
	}
	addPile(id: String, name: String, cards: String, password: String) {
		return this.axios.get(`/decks/${id}/piles/${name}/add?${cards}${password}`);
	}
	shufflePile(id: String, name: String, password: String) {
		return this.axios.get(`/decks/${id}/piles/${name}/shuffle?${password}`)
	}
	drawPile(id: String, name: String, amount: Number, password: String) {
		return this.axios.get(`/decks/${id}/piles/${name}/draw?amount=${amount}&${password}`);
	}
	drawBottomPile(id: String, name: String, amount: Number, password: String) {
		return this.axios.get(`/decks/${id}/piles/${name}/draw/bottom?amount=${amount}&${password}`)
	}
}

export default API;
