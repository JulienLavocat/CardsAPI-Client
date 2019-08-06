import API from "./api"
import DeckBuilder from "./deckBuilder";

class Client {

	api: API;

	constructor(url: String) {
		this.api = new API(url);
	}

	createDeck(deckType: String = "standard"): DeckBuilder {
		return new DeckBuilder(this.api, deckType);
	}

}

export default Client;