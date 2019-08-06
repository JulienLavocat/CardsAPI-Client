import API from "./api";
import Pile from "./pile";

class Deck {

	api: API;
	type: String;
	count: Number;
	remaining: Number;
	shuffled: Boolean;
	createdAt: Date;
	id: String;
	password: String;

	constructor(api: API, opts: any, password: String) {
		this.api = api;
		this.type = opts.type;
		this.count = opts.count;
		this.remaining = opts.remaining;
		this.shuffled = opts.shuffled;
		this.createdAt = new Date(opts.createdAt);
		this.id = opts.id;
		this.password = password;
	}

	async shuffle(): Promise<Deck> {
		const res = (await this.api.shuffleDeck(this.id, this.password)).deck;
		this.count = res.count;
		this.remaining = res.remaining;
		this.shuffled = res.shuffled;
		return this;
	}
	async draw(amount: Number = 1): Promise<String[]> {
		const res = await this.api.drawDeck(this.id, amount, this.password);
		this.remaining = res.remaining;
		return res.cards;
	}
	async drawBottom(amount: Number = 1): Promise<String[]> {
		const res = await this.api.drawBottomDeck(this.id, amount, this.password);
		this.remaining = res.remaining;
		return res.cards;
	}
	async getPile(name: String): Promise<Pile> {
		const res = await this.api.getPile(this.id, name, this.password);
		return new Pile(this.api, this.id, name, res.pile, this.password);
	}

}

export default Deck;