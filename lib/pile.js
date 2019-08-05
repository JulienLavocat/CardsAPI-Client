class Pile {
	constructor(api, deckId, name, opts, password) {
		this.api = api;
		this.deckId = deckId;
		this.name = name;
		this.password = password;
		this.remaining = opts.remaining;
	}

	async add(cards) {
		const result = await this.api.addPile(this.deckId,
			this.name, buildCardsQuery(cards),
			this.password
		);

		this.remaining = result.pile.remaining;
		return this;
	}
	async shuffle() {
		const res = await this.api.shufflePile(this.deckId, this.name, this.password);
		this.remaining = res.pile.remaining;
		return this;
	}
	async draw(amount = 1) {
		const res = await this.api.drawPile(this.deckId, this.name, amount, this.password);
		this.remaining = res.remaining;
		return res.cards;
	}
	async drawBottom(amount = 1) {
		const res = await this.api.drawBottomPile(this.deckId, this.name, amount, this.password);
		this.remaining = res.remaining;
		return res.cards;
	}

	//TODO: Add those methods in api
	//clear() {}
	//delete() {}

}

function buildCardsQuery(cards) {
	if(cards.constructor !== Array)
		return `&cards=${cards}`;

	let query = "&cards=";
	cards.forEach(card => {
		query += card + ",";
	});
	return query.slice(0, query.length - 1);
}

module.exports = Pile;
