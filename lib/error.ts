class CardsAPIError extends Error {

	code: any;
	details: any;

	constructor(code: any, message: any, details?: any) {
		super(message);
		this.code = code;
		if(details)
			this.details = details;
	}
}

export default CardsAPIError;
