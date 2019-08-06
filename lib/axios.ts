import axios, { AxiosInstance, AxiosResponse } from "axios";
import CardError from "./error";

//TODO: use baseUrl property

class Axios {

	axios: AxiosInstance;

	constructor(url: string) {
		this.axios = axios.create({
			baseURL: url
		});
	}

	async get(url: string, config?: any): Promise<any> {
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

export default Axios;
