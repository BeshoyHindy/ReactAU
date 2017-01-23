import { api_server } from '../../../.config/configuration';
import {ajaxErr} from '../lib/ajax';
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
			let err = new ajaxErr(error);
			throw(err);
		});;;

  }
  static setProductDetails(detail, progress){
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/details/${detail._id}`,
			dataType: 'JSON',
			data: detail,
			onUploadProgress: progress
		})
		.then( (response) => {
			return response.data;
		})
		.catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});;;
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
			let err = new ajaxErr(error);
			throw(err);
		});;;
	
  }
}



export default DetailApi;
