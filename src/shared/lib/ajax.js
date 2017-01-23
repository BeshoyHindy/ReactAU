class ajaxErr {
	constructor(axioErr) {
		let err = "Internal Server Error";
		if(!axioErr){
			return this.err = err;
		}
		if (axioErr.response) {
		// The request was made, but the server responded with a status code
		// that falls out of the range of 2xx
			err = axioErr.response.data.errMsg || axioErr.response.data;
			// console.log(axioErr.response.data);
			// console.log(axioErr.response.status);
			// console.log(axioErr.response.headers);
		} else if (axioErr.message){
			err = axioErr.message;
			// Something happened in setting up the request that triggered an Error
			// console.log('axioErr', axioErr.message);
		}
		this.err = err;
	}
}

export {ajaxErr} ;
