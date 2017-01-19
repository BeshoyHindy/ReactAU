import React from 'react';
import { isEmptyObject} from "../Shared/Shared";

class AdminEditImageArray extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			images: []
		};
		this.changeImage = this.changeImage.bind(this);
		this.deleteInsertImage = this.deleteInsertImage.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props != nextProps){
			let {data} = nextProps;
			this.setState({data: isEmptyObject(data)?[]:data});
		}		
	}		
	changeImage(e){
		let files = e.target.files;
		let nImgs=[...this.state.images];
		let nData=[...this.state.data];

		for(let id in files){
			let file = files[id];
			if (file && file.type && file.type.match('image.*')) {
				let reader = new FileReader();
				reader.onload = (e) => {
					nImgs.push({
						data_uri: e.target.result,
						filename: file.name,
						filetype: file.type
					});
					nData.push( `/img/products/${file.name}`);
					this.setState({images: nImgs, data: nData});
					this.props.setNewImages(nImgs);
				};
				reader.readAsDataURL(file);
			}
		}
	}
	deleteInsertImage(e){
		let id = parseInt(e.target.getAttribute("data-id"));
		let nImgs=[
					...this.state.images.slice( 0, id) ,
					...this.state.images.slice( id+1, this.state.images.length)
			];
		this.setState({images: nImgs});
		this.props.setNewImages(nImgs);
	}
	deleteImage(e){
		let id = parseInt(e.target.getAttribute("data-id"));
		let nImgs=[...this.state.data.slice( 0, id) ,...this.state.data.slice( id+1, this.state.data.length)];
		this.setState({data: nImgs});
		this.props.setData(this.props.field, nImgs);
	}
	render () {
		return (
		<div>
			<ul className="fa-ul">
				<li><i className="fa-li fa fa-check-square"/>已上傳之圖檔</li>
				<li>
					<div className="upload-image-list-wrap">
					{
						this.state.data.map((item,id)=>	id < this.props.data.length ? <div key={id} className="upload-image-list"><i className="fa fa-close icon-item delete-item upload-image-delete" data-id={id} onClick={this.deleteImage}/> <img className='upload-image' src={item}/></div> :"")
					}
					</div>
				</li>
				<li><i className="fa-li fa fa-check-square"/>欲新上傳之檔案</li>
				<li >
					<input type="file" accept='image/*' className="form-control" multiple value="" onChange={this.changeImage}/>
					<div className="upload-image-list-wrap">
					{
						this.state.images.map((item,id)=> <div key={id} className="upload-image-list"><i className="fa fa-close icon-item delete-item upload-image-delete" data-id={id} onClick={this.deleteInsertImage}/> <img className='upload-image' src={item.data_uri}/></div> )
					}
					</div>
				</li>
			</ul>
		</div>
		);
	}
}

AdminEditImageArray.defaultProps = {
	data: []
};

export default AdminEditImageArray;
