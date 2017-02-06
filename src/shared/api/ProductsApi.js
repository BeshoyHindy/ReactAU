import axios from 'axios';
import {isvalidRoute} from '../Data/RouteData';
import { api_server } from '../../../.config/configuration';
import {ajaxErr} from '../lib/ajax';

class ProductApi {
  static getAllProducts(ptype, subpType) {
		//console.log('getAllProducts', ptype, subpType);
	if (!isvalidRoute(ptype, subpType)){
		return new Promise((resolve, reject) => {
			console.log("invalid product type", ptype, subpType);
			reject("invalid product type", ptype, subpType);
		});
	}

	return axios({
		method: 'get',
		url: `${api_server.http.host}:${api_server.http.port}/api/category/${ptype}`,
		dataType: 'JSON'
	}).then((response) => {
		//console.log('getAllProducts success ', response.data);
		return response.data;
	}).catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});
  }
}

export default ProductApi;
