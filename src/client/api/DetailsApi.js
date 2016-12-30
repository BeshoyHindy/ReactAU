import axios from 'axios';

class DetailApi {
  static getAllDetails(id) {
    return axios({
		method: 'get',
		url: `/json/details/${id}.json`,
		dataType: 'JSON'
	})
	.then( (response) => {
		return response.data;
	});
  }

}

export default DetailApi;
