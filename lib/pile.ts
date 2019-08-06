import API from "./api";

class Pile {

	api: API;
	deckId: String;
	name: String;
	password: String;
	remaining: Number;

	constructor(api: API, deckId: String, name: String, opts: any, password: String) {
		this.api = api;
		this.deckId = deckId;
		this.name = name;
		this.password = password;
		this.remaining = opts.remaining;
	}

	async add(cards: String[] | String): Promise<Pile> {
		const result = await this.api.addPile(this.deckId,
			this.name,
			buildCardsQuery(cards),
			this.password
		);

		this.remaining = result.pile.remaining;
		return this;
	}
	async shuffle(): Promise<Pile> {
		const res = await this.api.shufflePile(this.deckId, this.name, this.password);
		this.remaining = res.pile.remaining;
		return this;
	}
	async draw(amount: Number = 1): Promise<String[]> {
		const res = await this.api.drawPile(this.deckId, this.name, amount, this.password);
		this.remaining = res.remaining;
		return res.cards;
	}
	async drawBottom(amount: Number = 1): Promise<String[]> {
		const res = await this.api.drawBottomPile(this.deckId, this.name, amount, this.password);
		this.remaining = res.remaining;
		return res.cards;
	}
}

function buildCardsQuery(cards: any): String {
	if(cards.constructor !== Array)
		return `&cards=${cards}`;

	let query = "&cards=";
	cards.forEach(card => {
		query += card + ",";
	});
	return query.slice(0, query.length - 1);
}

export default Pile;
