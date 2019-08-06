import {CardsClient} from ".";

const cardsClient = new CardsClient("https://cards.thebad.xyz");

start();

async function start() {
	try {
		let deck = await cardsClient
			.createDeck("standard")
			.fromCards(["J"])
			.deckCount(3)
			.setPassword("test")
			.build();

		const testPile = await deck.getPile("jokers");

		await testPile.add(["J", "J"]);
		console.log(await testPile.draw(3));

		await testPile.add(["1","2", "3", "4", "5", "6"]);
		console.log(testPile.remaining);

		await testPile.shuffle();
		console.log(await testPile.draw(6));

		await testPile.add(["Top", "Bottom"]);
		console.log(await testPile.drawBottom());
		await testPile.add(["Top", "Bottom"]);
		console.log(await testPile.draw());

	} catch (error) {
		console.error(error);
	}
}
