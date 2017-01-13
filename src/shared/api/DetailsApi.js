import { api_server } from '../../../.config/configuration';
import axios from 'axios';

class DetailApi {
  static getAllDetails(id) {
    return axios({
		method: 'get',
		url: `${api_server.http.host}:${api_server.http.port}/api/details/${id}`,
		dataType: 'JSON'
	})
	.then( (response) => {
		return response.data;
	});
  }

}

export default DetailApi;
