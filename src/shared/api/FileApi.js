import axios from 'axios';

class FileApi {
  static upLoadImages(id, data) {
			return axios({
			method: 'post',
			url: `/file/images/${id}`,
			data: data
		})
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
			url: `/file/docs/${id}`,
			data: data
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