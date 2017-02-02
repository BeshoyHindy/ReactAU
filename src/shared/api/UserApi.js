import { api_server } from '../../../.config/configuration';
import axios from 'axios';
import {ajaxErr} from '../lib/ajax';


class UserApi {
  static setUserProfile(data, upload, token){
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/account`,
			dataType: 'JSON',
			data: data,
			headers: {'authorization': token},
			onUploadProgress: upload
		}).then( (response) => {
				return response.data;
		})
		.catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});
	}
  
  static setUserProductRate(data, token){
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/account/rate/${data.id}`,
			dataType: 'JSON',
			data: {rate: data.rate},
			headers: {'authorization': token}
		}).then( (response) => {
				return response.data;
		})
		.catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});
	}
  
}


export default UserApi;
