import {API} from "./api";

export class Pile {

	api: API;
	deckId: string;
	name: string;
	password: string;
	remaining: number;

	constructor(api: API, deckId: string, name: string, opts: any, password: string) {
		this.api = api;
		this.deckId = deckId;
		this.name = name;
		this.password = password;
		this.remaining = opts.remaining;
	}

	async add(cards: string[] | string): Promise<Pile> {
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
	async draw(amount: number = 1): Promise<string[]> {
		const res = await this.api.drawPile(this.deckId, this.name, amount, this.password);
		this.remaining = res.remaining;
		return res.cards;
	}
	async drawBottom(amount: number = 1): Promise<string[]> {
		const res = await this.api.drawBottomPile(this.deckId, this.name, amount, this.password);
		this.remaining = res.remaining;
		return res.cards;
	}
}

function buildCardsQuery(cards: any): string {
	if(cards.constructor !== Array)
		return `&cards=${cards}`;

	let query = "&cards=";
	cards.forEach(card => {
		query += card + ",";
	});
	return query.slice(0, query.length - 1);
}