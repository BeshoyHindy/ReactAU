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

  static addUser(user , progress ){
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/add_user`,
			dataType: 'JSON',
			data: user,
			headers: {'authorization': localStorage.getItem('token')},
			onUploadProgress: progress
		})
		.then( (response) => {
			return response.data;
		})
		.catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});
	}  
	static deleteProduct(id ) {
    return axios({
			method: 'delete',
			url: `${api_server.http.host}:${api_server.http.port}/api/details/${id}`,
			dataType: 'JSON',
			headers: {'authorization': localStorage.getItem('token')}
		})
		.then( (response) => {
			return response.data;
		})
		.catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});
	
  }
  static setProductDetails(detail, progress ){
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/details/${detail._id}`,
			dataType: 'JSON',
			data: detail,
			headers: {'authorization': localStorage.getItem('token')},
			onUploadProgress: progress
		})
		.then( (response) => {
			return response.data;
		})
		.catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});
	}
  
}

export default AdminApi;
