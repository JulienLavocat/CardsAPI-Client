import {API} from "./api"
import {DeckBuilder} from "./deckBuilder";

export class CardsClient {

	api: API;

	constructor(url: string) {
		this.api = new API(url);
	}

	createDeck(deckType: string = "standard"): DeckBuilder {
		return new DeckBuilder(this.api, deckType);
	}

}