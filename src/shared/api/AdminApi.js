import { api_server } from '../../../.config/configuration';
import axios from 'axios';

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
	});
  }

}

export default AdminApi;
