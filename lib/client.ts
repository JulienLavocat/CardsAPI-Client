import { API } from "./api";
import { DeckBuilder } from "./deckBuilder";

export class CardsClient {
	api: API;

	/**
	 * Creates a new CardsClient, using host as base url
	 * @param {string} host url base where the api listen (ex: https://example.com)
	 */
	constructor(url: string) {
		this.api = new API(url);
	}

	/**
	 * Create a new deck from a given deck type
	 * @param {string} deckType
	 */
	createDeck(deckType: string = "standard"): DeckBuilder {
		return new DeckBuilder(this.api, deckType);
	}
}
