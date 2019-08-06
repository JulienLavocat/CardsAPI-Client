import CardsAPIError from "./error";
import API from "./api";
import Deck from "./deck";

class DeckBuilder {

	api: API;
	deckType: String;
	count: Number;
	shuffled: Boolean;
	cards: String[];
	password: String;

	constructor(api: API, deckType: String) {
		this.api = api;
		this.deckType = deckType;
		this.count = 1;
		this.shuffled = false;
	}

	fromCards(cards: String[]): DeckBuilder {
		this.cards = cards;
		return this;
	}
	deckCount(deckCount: Number): DeckBuilder {
		this.count = deckCount;
		return this;
	}
	shuffle(): DeckBuilder {
		this.shuffled = !this.shuffled;
		return this;
	}
	setPassword(password: String): DeckBuilder {
		this.password = "&password=" + password;
		return this;
	}

	buildQueryParams(): String {
		return `?deckType=${this.deckType}&deckCount=${this.count}&shuffle=${
			this.shuffled
		}\
${this.password ? this.password : ""}\
${this.deckType === "custom" ? this.buildCardsQuery() : ""}`;
	}
	buildCardsQuery(): String {
		if (!this.cards)
			throw new CardsAPIError(
				"NO_CARDS_PROVIDED",
				"No cards provided while building a custom deck deck"
			);

		if (this.cards.constructor !== Array) return `&cards=${this.cards}`;

		let query = "&cards=";
		this.cards.forEach(card => {
			query += card + ",";
		});
		return query.substring(0, query.length - 1);
	}

	async build(): Promise<Deck> {
		return new Deck(
			this.api,
			(await this.api.newDeck(this.buildQueryParams())).deck,
			this.password
		);;
	}
	async fromId(id: String, password?: String): Promise<Deck> {
		if (password) password = "&password=" + password;
		return new Deck(
			this.api,
			(await this.api.getDeck(id, password)).deck,
			password
		);
	}
}

export default DeckBuilder;
