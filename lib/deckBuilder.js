const CardsAPIError = require("./error");
const Deck = require("./deck");

class DeckBuilder {
	constructor(api, deckType) {
		this.api = api;
		this.deckType = deckType;
		this.count = 1;
		this.shuffled = false;
	}

	cards(cards) {
		this.cards = cards;
		return this;
	}
	deckCount(deckCount) {
		this.count = deckCount;
		return this;
	}
	shuffle() {
		this.shuffled = true;
		return this;
	}
	unshuffled() {
		this.shuffled = false;
		return this;
	}
	password(password) {
		this.pwd = "&password=" + password;
		return this;
	}

	buildQueryParams() {
		return `?deckType=${this.deckType}&deckCount=${this.count}&shuffle=${
			this.shuffled
		}\
${this.pwd ? this.pwd : ""}\
${this.deckType === "custom" ? this.buildCardsQuery() : ""}`;
	}
	buildCardsQuery() {
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

	async build() {
		return new Deck(
			this.api,
			(await this.api.newDeck(this.buildQueryParams())).deck,
			this.pwd
		);
	}
	async fromId(id, password) {
		if (password) password = "&password=" + password;
		return new Deck(
			this.api,
			(await this.api.getDeck(id, password)).deck,
			password
		);
	}
}

module.exports = DeckBuilder;
