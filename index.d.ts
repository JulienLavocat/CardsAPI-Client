declare class CardsClient {

	/**
	 * Creates a new CardsClient, using host as base url
	 * @param host url base where the api listen (ex: https://example.com)
	 */
	new(host: String): CardsClient;

	/**
	 * Create a new deck from a given deck type
	 * @param {DeckTypes} deckType
	 */
	createDeck(deckType?: DeckTypes): DeckBuilder;
}

type DeckTypes =
	| "standard"
	| "standardJokers"
	| "standard32"
	| "standard32Jokers"
	| "blackjack"
	| "tarot"
	| "rummy";

interface DeckBuilder {

	/**
	 * When using the custom deck type, this property is mandatory. It contains the cards that
	 * your deck will be composed of
	 * @param cards The cards that will be used by the deck
	 */
	cards(cards: String[]): DeckBuilder;

	/**
	 * Set the number of decks, used for games that use multiples decks (like blackjack, which use 6 standrd decks)
	 * @param count How many deck will be included
	 */
	deckCount(count: Number): DeckBuilder;

	/**
	 * Set the deck as shuffled
	 */
	shuffle(): DeckBuilder;

	/**
	 * Set the deck as not-shuffled
	 */
	unshuffled(): DeckBuilder;

	/**
	 * Define a password to protect the deck
	 * @param password Password to use
	 */
	password(password: String): DeckBuilder;

	/**
	 * Create a new deck using the provided parameters
	 */
	build(): Promise<Deck>;

	/**
	 * Retrieve an existing deck
	 * @param id Id of the deck
	 * @param password Password, if required
	 */
	fromId(id: String, password?: String): Promise<Deck>;

}

interface Deck {

	/**
	 * Type of the deck
	 */
	type: DeckTypes;
	/**
	 * Number of decks
	 */
	count: Number;
	/**
	 * Remaining cards in deck
	 */
	remaining: Number;
	/**
	 * Is deck shuffled
	 */
	shuffled: Boolean;
	/**
	 * Deck creation date
	 */
	createdAt: Date;
	/**
	 * Id of the deck
	 */
	id: String;
	/**
	 * Password protecting the deck
	 */
	password: String;

	/**
	 * Shuffle the deck, use this instead of re-creating a new deck
	 */
	shuffle(): Promise<Deck>;
	/**
	 * Draw one or more cards
	 * @param amount Amount to draw, defaults to 1
	 */
	draw(amount?: Number): Promise<String[]>;
	/**
	 * Draw one or more cards
	 * @param amount Amount to draw, defaults to 1
	 */
	drawBottom(amount?: Number): Promise<String[]>;
	/**
	 * Get or create a pile
	 * @param name Name of the pile
	 */
	getPile(name: String): Promise<Pile>;

}

interface Pile {

}

export = CardsClient;
