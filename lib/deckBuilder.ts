import {CardsAPIError} from "./error";
import {API} from "./api";
import {Deck} from "./deck";

export class DeckBuilder {

	api: API;
	deckType: string;
	count: number;
	shuffled: Boolean;
	cards: string[];
	password: string;

	constructor(api: API, deckType: string) {
		this.api = api;
		this.deckType = deckType;
		this.count = 1;
		this.shuffled = false;
	}

	/**
	 * When using the custom deck type, this property is mandatory. It contains the cards that
	 * your deck will be composed of
	 * @param cards The cards that will be used by the deck
	 */
	fromCards(cards: string[]): DeckBuilder {
		this.cards = cards;
		return this;
	}
	/**
	 * Set the number of decks, used for games that use multiples decks (like blackjack, which use 6 standrd decks)
	 * @param count How many deck will be included
	 */
	deckCount(deckCount: number): DeckBuilder {
		this.count = deckCount;
		return this;
	}
	/**
	 * Set the deck as shuffled, if shuffled is already equals to true
	 * then it will set it as false
	 */
	shuffle(): DeckBuilder {
		this.shuffled = !this.shuffled;
		return this;
	}
	/**
	 * Define a password to protect the deck
	 * @param password Password to use
	 */
	setPassword(password: string): DeckBuilder {
		this.password = "&password=" + password;
		return this;
	}

	buildQueryParams(): string {
		return `?deckType=${this.deckType}&deckCount=${this.count}&shuffle=${
			this.shuffled
		}\
${this.password ? this.password : ""}\
${this.deckType === "custom" ? this.buildCardsQuery() : ""}`;
	}
	buildCardsQuery(): string {
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

	/**
	 * Build the deck
	 */
	async build(): Promise<Deck> {
		return new Deck(
			this.api,
			(await this.api.newDeck(this.buildQueryParams())).deck,
			this.password
		);;
	}
	/**
	 * Retrieve an existing deck
	 * @param id Id of the deck
	 * @param password Password, if required
	 */
	async fromId(id: string, password?: string): Promise<Deck> {
		if (password) password = "&password=" + password;
		return new Deck(
			this.api,
			(await this.api.getDeck(id, password)).deck,
			password
		);
	}
}