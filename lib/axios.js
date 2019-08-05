const axios = require("axios");
const CardError = require("./error");

//TODO: use baseUrl property

class Axios {
	constructor(url) {
		this.axios = axios.create({
			baseURL: url
		});
	}

	async get(url, config) {
		url = encodeURI(url);
		try {
			const result = await this.axios.get(url, config);
			delete result.data.success;
			return result.data;
		} catch (error) {
			if (error.response) {
				const errorData = error.response.data.error;
				throw new CardError(errorData.status, errorData.message, errorData.details);
			} else if (error.request) {
				console.log(error);

				throw new CardError("EMPTY_RESPONSE", "No response received");
			} else {
				throw error;
			}
		}
	}
}

module.exports = Axios;
