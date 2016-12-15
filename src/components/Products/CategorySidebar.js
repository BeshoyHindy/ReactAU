import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import {nav, isvalidRoute} from '../../Data/RouteData';

const ProductIndexSidebar = () => (
<div>
					<div className="col-sm-12 cat">
						<ul ><li>Products:
									<ul>
										<li><Link to="/products/DVR/All">DVR</Link></li>
										<li><Link to="/products/KIT/All">Kit</Link></li>
										<li><Link to="/products/NVR/All">NVR</Link></li>
										<li><Link to="/products/CCTV/All">CCTV Camera</Link></li>
										<li><Link to="/products/ALARM/All">Instrusion Alarm</Link></li>
										<li><Link to="/products/INTERCOM/All">Video Intercom</Link></li>
									</ul>
								</li>
							</ul>
					</div>
				</div>
);

class ProductCategorySidebar extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				products:[],
				selected:''
			};
		}

		componentDidUpdate (prevProps, prevState) {
			if (!isvalidRoute(this.props.params.product, this.props.params.ProductsTbl))
				return;
			let oldId = prevProps.params.product;
			let newId = this.props.params.product;
			let oldTblId = prevProps.params.ProductsTbl;
			let newTblId = this.props.params.ProductsTbl;

			if (oldTblId && newTblId !== oldTblId)
				this.setState({selected  : this.props.params.ProductsTbl});

			if (oldId && newId !== oldId)
				this.fetchData();
		}
		componentWillMount() {
			this.fetchData();
		}
		// existMatch(subnav, path){
		// 	if ( subnav && subnav.length > 0) {
		// 		return (subnav.filter((item, id) => {
		// 			if ( item.sub && item.sub.length > 0) {
		// 				if(item.link.indexOf(path) !== -1)
		// 					return true;
		// 				return this.existMatch(item.sub, path);
		// 			}else{
		// 				return (item.link.indexOf(path) !== -1);
		// 			}
		// 		}).length > 0);
		// 	}
		// 	return true;
		// }

		// validRoute(path){
		// 	return this.existMatch(nav, path);
		// }
		fetchData(){
			if (!isvalidRoute(this.props.params.product, this.props.params.ProductsTbl))
				return;

			//console.log('this.props.params: ', this.props.params);
			let cat = this.props.params.product || 'DVR';
			axios({
				method: 'get',
				url: '/json/'+cat+'.json',
				dataType: 'JSON'
			})
			.then( (response) => {
				this.setState({
					products: response.data
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		}
		isActive(value){
			return ((value===this.state.selected) ?'active':'');
		}
		render() {
			//console.log(this.state.products);
			//console.log(this.state.products.length );
			if (!isvalidRoute(this.props.params.product, this.props.params.ProductsTbl)){
				return (<div>

				</div>);
			}else{

				let uniqArray = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);
				let brands = uniqArray(this.state.products.map((item, index) => (item.brand)));
				let type = uniqArray( this.state.products.map((item, index) => (item.type)));
				return (
					<div>
						<div className="col-sm-12 cat">
							<ul ><li>Brand:
										<ul>
											<li className={this.isActive( 'All' )}><Link to={`/products/${this.props.params.product}/All`}>All</Link></li>
											{
												brands.map((item, index) => (
													<li key={index}  className={this.isActive( item )}>
														<Link to={`/products/${this.props.params.product}/${item}`}> {item} </Link>
													</li>
												))
											}
										</ul>
									</li>
									<li>System:
										<ul>
											<li className={this.isActive( 'All' )}><Link to={`/products/${this.props.params.product}/All`} >All</Link></li>
											{
												type.map((item, index) => (
													<li key={index}  className={this.isActive( item )}>
														<Link to={`/products/${this.props.params.product}/${item}`}> {item} </Link>
													</li>
												))
											}
										</ul>
									</li>
								</ul>
						</div>
					</div>
				);
			}
		}

}

export {ProductCategorySidebar, ProductIndexSidebar};
