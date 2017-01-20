import React from 'react';
import { isEmptyObject} from "../Shared/Shared";

class AdminEditImageArray extends React.Component{
	constructor(props) {
		super(props);
		this.changeImage = this.changeImage.bind(this);
		this.deleteInsertImage = this.deleteInsertImage.bind(this);
		this.deleteImage = this.deleteImage.bind(this);

	}
	componentDidMount() {
	}
	componentWillReceiveProps(nextProps) {
	}
	changeImage(e){
		let files = e.target.files;
		let nImgs=[...this.props.newImages];

		for(let id in files){
			let file = files[id];
			if (file && file.type && file.type.match('image.*')) {
				let reader = new FileReader();
				reader.onload = (e) => {
					nImgs.push({
						data_uri: e.target.result,
						file
					});
					this.props.setNewImages(nImgs);
				};
				reader.readAsDataURL(file);
			}
		}
	}
	deleteInsertImage(e){
		let id = parseInt(e.target.getAttribute("data-id"));
		let nImgFile=[
					...this.props.newImages.slice( 0, id) ,
					...this.props.newImages.slice( id+1, this.props.newImages.length)
			];
		this.props.setNewImages(nImgFile);
	}
	deleteImage(e){
		let id = parseInt(e.target.getAttribute("data-id"));
		let nImgs=[...this.props.data.slice( 0, id) ,...this.props.data.slice( id+1, this.props.data.length)];
		this.props.setData(this.props.field, nImgs);
	}
	
	render () {
		return (
		<div>
			<form method="post" name ="photo" id="imageuploadform">
				<ul className="fa-ul">
					<li><i className="fa-li fa fa-check-square"/>已上傳之圖檔</li>
					<li>
						<div className="upload-image-list-wrap">
						{
							this.props.data.map((item,id)=>	id < this.props.data.length ? <div key={id} className="upload-image-list"><i className="fa fa-close icon-item delete-item upload-image-delete" data-id={id} onClick={this.deleteImage}/> <img className='upload-image' src={item}/></div> :"")
						}
						</div>
					</li>
					<li><i className="fa-li fa fa-check-square"/>欲新上傳之檔案</li>
					<li >
						<input type="file" accept='image/*' className="form-control" id="uploadImages" name="uploadImages" multiple value="" onChange={this.changeImage}/>
						<div className="upload-image-list-wrap">
						{
							this.props.newImages.map((item,id)=> <div key={id} className="upload-image-list"><i className="fa fa-close icon-item delete-item upload-image-delete" data-id={id} onClick={this.deleteInsertImage}/> <img className='upload-image' src={item.data_uri}/></div> )
						}
						</div>
					</li>
				</ul>
			</form>
		</div>
		);
	}
}

AdminEditImageArray.defaultProps = {
	data: []
};

export default AdminEditImageArray;
