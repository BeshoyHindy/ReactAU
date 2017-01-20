import { api_server } from '../../../.config/configuration';
import axios from 'axios';

class FileApi {
  	static upLoadImages(id, data, config) {
				return axios.post(
						`${api_server.http.host}:${api_server.http.port}/api/file/images/${id}`, 
						data, 
						config)
				.then( (response) => {
						return response.data;
				})
				.catch(function (error) {
						console.log(error);
						return error.data;
				});
  }  
  static upLoadDocs(id, data, config) {
				return axios.post(
						`${api_server.http.host}:${api_server.http.port}/api/file/docs/${id}`, 
						data, 
						config)
				.then( (response) => {
						return response.data;
				})
				.catch(function (error) {
						console.log(error);
						return error.data;
				});
  }    
}



export default FileApi;