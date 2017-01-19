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
		})
		.catch(function (error) {
			console.log(error);
			return error.data;
		});

  }
  static setProductDetails(detail){
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/details/${detail._id}`,
			dataType: 'JSON',
			data: detail
		})
		.then( (response) => {
			return response.data;
		})
		.catch(function (error) {
			return error.data;
		});
	}

	static deleteProduct(id) {
    return axios({
			method: 'delete',
			url: `${api_server.http.host}:${api_server.http.port}/api/details/${id}`,
			dataType: 'JSON'
		})
		.then( (response) => {
			return response.data;
		})
		.catch(function (error) {
			return error.data;
		});
	
  }
}



export default DetailApi;
