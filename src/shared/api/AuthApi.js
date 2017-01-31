import { api_server } from '../../../.config/configuration';
import axios from 'axios';
import {ajaxErr} from '../lib/ajax';

class AuthApi {
  static userSignup(user){
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/signup`,
			dataType: 'JSON',
			data: user
		})
		.then( (response) => {
			return response.data;
		})
		.catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});
	}

  static userSignin(user){
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/signin`,
			dataType: 'JSON',
			data: user
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



export default AuthApi;
