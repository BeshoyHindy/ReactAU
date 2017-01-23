import { api_server } from '../../../.config/configuration';
import axios from 'axios';
import {ajaxErr} from '../lib/ajax';

class AdminApi {
  static getAllCategories() {
			//console.log("AdminApi", `${api_server.http.host}:${api_server.http.port}/api/categories`);
		return axios({
			method: 'get',
			url: `${api_server.http.host}:${api_server.http.port}/api/categories`,
			dataType: 'JSON'
		})
		.then( (response) => {		
			//console.log("AdminApi", response.data);
			return response.data;
		}).catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});
  }

}

export default AdminApi;
