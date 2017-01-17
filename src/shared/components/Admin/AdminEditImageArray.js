import React from 'react';


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
	changeImage(e){
		let files = e.target.files;
		let nImgs=[...this.state.images];
		let nData=[...this.state.data];

		for(let id in files){
			let reader = new FileReader();
			let file = files[id];
			reader.onload = (e) => {
				nImgs.push(e.target.result);
				nData.push( `/img/products/${file.name}`);
				this.setState({images: nImgs, data: nData});
				this.props.setImage(this.props.field, nImgs);
			};
			reader.readAsDataURL(file);
		}
	}
	deleteInsertImage(e){
		let id = parseInt(e.target.getAttribute("data-id"));
		let nImgs=[...this.state.images.slice( 0, id) ,...this.state.images.slice( id+1, this.state.images.length)];
		this.setState({images: nImgs});
		this.props.setImage(this.props.field, nImgs);
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
						this.state.data.map((item,id)=>	id < this.props.data.length ? <div key={id} className="upload-image-list"><span className="upload-image-delete" data-id={id} onClick={this.deleteImage}> x </span><img className='upload-image' src={item}/></div> :"")
					}
					</div>
				</li>
				<li><i className="fa-li fa fa-check-square"/>欲新上傳之檔案</li>
				<li >
					<input type="file" accept='image/*' className="form-control" multiple value="" onChange={this.changeImage}/>
					<div className="upload-image-list-wrap">
					{
						this.state.images.map((item,id)=> <div key={id} className="upload-image-list"><span className="upload-image-delete" data-id={id} onClick={this.deleteInsertImage}> x </span><img className='upload-image' src={item}/></div> )
					}
					</div>
				</li>
			</ul>
		</div>
		);
	}
}


export default AdminEditImageArray;
