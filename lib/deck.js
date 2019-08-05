const Pile = require("./pile");

class Deck {

	constructor(api, opts, password) {
		this.api = api;
		this.type = opts.type;
		this.count = opts.count;
		this.remaining = opts.remaining;
		this.shuffled = opts.shuffled;
		this.createdAt = opts.createdAt;
		this.id = opts.id;
		this.password = password;
	}

	async shuffle() {
		const res = (await this.api.shuffleDeck(this.id, this.password)).deck;
		this.count = res.count;
		this.remaining = res.remaining;
		this.shuffled = res.shuffled;
	}
	async draw(amount = 1) {
		const res = await this.api.drawDeck(this.id, amount, this.password);
		this.remaining = res.remaining;
		return res.cards;
	}
	async drawBottom(amount = 1) {
		const res = await this.api.drawBottomDeck(this.id, amount, this.password);
		this.remaining = res.remaining;
		return res.cards;
	}
	async getPile(name) {
		const res = await this.api.getPile(this.id, name, this.password);
		return new Pile(this.api, this.id, name, res.pile, this.password);
	}

}

module.exports = Deck;