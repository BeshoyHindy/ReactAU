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

  static userCheckAuth( token){
		return axios({
			method: 'get',
			url: `${api_server.http.host}:${api_server.http.port}/api/checkAuth`,
			dataType: 'JSON',
			headers: {'authorization': token},
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
	static userSocialLoginClient(data){
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/socialLogin/${data.type}`	,
			dataType: 'JSON',
			data: data			
		})
		.then( (response) => {
			return response.data;
		})
		.catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});
	}	
//   static userSigninSocial(data){
// 		return axios({
// 			method: 'get',
// 			url: `${api_server.http.host}:${api_server.http.port}/auth/${data.type}`	
// 		})
// 		.then( (response) => {
// 			return response.data;
// 		})
// 		.catch(function (error) {
// 			let err = new ajaxErr(error);
// 			throw(err);
// 		});
// 	}
}



export default AuthApi;
