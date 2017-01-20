import { api_server } from '../../../.config/configuration';
import axios from 'axios';

class FileApi {
  	static upLoadImages(id, data) {
				var config = {
						onUploadProgress: function(progressEvent) {
								var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
								console.log("---------", percentCompleted);
						}
				};

				return axios.post(`${api_server.http.host}:${api_server.http.port}/api/file/images/${id}`, data, config)
										.then( (response) => {
												return response.data;
										})
										.catch(function (error) {
												console.log(error);
												return error.data;
										});
  }  
  static upLoadDocs(id, data) {
			return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/docs/${id}`,
			data
		})
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