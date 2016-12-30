import axios from 'axios';
import {isvalidRoute} from '../Data/RouteData';

class ProductApi {
  static getAllProducts(ptype, subpType) {
	if (!isvalidRoute(ptype, subpType)){
		return new Promise((resolve, reject) => {
			reject("invalid product type");
		});
	}
	return axios({
		method: 'get',
		url: `/json/${ptype}.json`,
		dataType: 'JSON'
	}).then((response) => {
		return response.data;
	});
  }
}

export default ProductApi;
