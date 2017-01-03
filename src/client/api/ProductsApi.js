import axios from 'axios';
import {isvalidRoute} from '../Data/RouteData';
import { api_server } from '../../../.config/configuration';

class ProductApi {
  static getAllProducts(ptype, subpType) {
		//console.log('getAllProducts', ptype, subpType);
	if (!isvalidRoute(ptype, subpType)){
		return new Promise((resolve, reject) => {
			console.log("invalid product type");
			reject("invalid product type");
		});
	}
	return axios({
		method: 'get',
		url: `${api_server.http.host}/json/${ptype}.json`,
		dataType: 'JSON'
	}).then((response) => {
		//console.log('getAllProducts success ', response.data);
		return response.data;
	});
  }
}

export default ProductApi;
