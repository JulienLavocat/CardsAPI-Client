declare namespace CardsAPIClient {

	function createDeck(deckType?: DeckTypes): DeckBuilder;

}

type DeckTypes =
	"standard" |
	"standardJokers" |
	"standard32" |
	"standard32Jokers"|
	"blackjack" |
	"tarot" |
	"rummy";

interface DeckBuilder {

}

export = CardsAPIClient;
