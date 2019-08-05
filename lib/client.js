const API = require("./api");
const DeckBuilder = require("./deckBuilder");

class Client {

	constructor(url) {
		this.api = new API(url);
	}

	createDeck(deckType = "standard") {
		return new DeckBuilder(this.api, deckType);
	}

}

module.exports = Client;