const Axios = require("./axios");

class API {
	constructor(url) {
		this.axios = new Axios(url);
	}

	newDeck(query) {
		return this.axios.get(`/decks/new${query}`);
	}
	getDeck(id, password) {
		return this.axios.get(`/decks/${id}?${password}`);
	}
	shuffleDeck(id, password) {
		return this.axios.get(`/decks/${id}/shuffle?${password}`)
	}
	drawDeck(id, amount, password) {
		return this.axios.get(`/decks/${id}/draw?amount=${amount}&${password}`);
	}
	drawBottomDeck(id, amount, password) {
		return this.axios.get(`/decks/${id}/draw/bottom?amount=${amount}&${password}`);
	}
	getPile(id, name, password) {
		return this.axios.get(`/decks/${id}/piles/${name}?${password}`);
	}
	addPile(id, name, cards, password) {
		return this.axios.get(`/decks/${id}/piles/${name}/add?${cards}${password}`);
	}
	shufflePile(id, name, password) {
		return this.axios.get(`/decks/${id}/piles/${name}/shuffle?${password}`)
	}
	drawPile(id, name, amount, password) {
		return this.axios.get(`/decks/${id}/piles/${name}/draw?amount=${amount}&${password}`);
	}
	drawBottomPile(id, name, amount, password) {
		return this.axios.get(`/decks/${id}/piles/${name}/draw/bottom?amount=${amount}&${password}`)
	}
}

module.exports = API;
