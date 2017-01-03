import { api_server } from '../../../.config/configuration';
import axios from 'axios';

class DetailApi {
  static getAllDetails(id) {
    return axios({
		method: 'get',
		url: `${api_server.http.host}/json/details/${id}.json`,
		dataType: 'JSON'
	})
	.then( (response) => {
		return response.data;
	});
  }

}

export default DetailApi;
