import { api_server } from '../../../.config/configuration';
import axios from 'axios';
import {ajaxErr} from '../lib/ajax';

class FileApi {
	static upLoadImages(id, data, upload, token) {
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/file/images/${id}`,
			dataType: 'JSON',
			data: data,
			headers: {'authorization': token},
			onUploadProgress: upload}
		).then( (response) => {
				return response.data;
		})
		.catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});
	}  
 
	static upLoadDocs(id, data, upload, token) {
		return axios({
			method: 'post',
			url: `${api_server.http.host}:${api_server.http.port}/api/file/docs/${id}`, 
			dataType: 'JSON',
			data: data,
			headers: {'authorization': token},
			onUploadProgress: upload}
		).then( (response) => {
				return response.data;
		})
		.catch(function (error) {
			let err = new ajaxErr(error);
			throw(err);
		});
	}    
}



export default FileApi;
