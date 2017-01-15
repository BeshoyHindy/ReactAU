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
  static setProductDetails(detail){
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/details/${detail.id}`,
			dataType: 'JSON',
			data: detail
		})
		.then( (response) => {
			return response.data;
		});
	}
}

export default DetailApi;
