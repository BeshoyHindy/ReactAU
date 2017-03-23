import { Link} from 'react-router-dom';
import React from 'react';
import { isvalidRoute} from '../../../Data/RouteData';


const Classify =  (props) => (
			<li>{props.title}
				<ul>
					<li className={props.isActive( 'All' )}><Link to={`/products/${props.productType}/All`} >All ({props.count.All})</Link></li>
					{
						props.data.map((item, index) => (
							<li key={index}  className={props.isActive( item )}>
								<Link to={`/products/${props.productType}/${item}`}> {item} ({props.count[item]})</Link>
							</li>
						))
					}
				</ul>
			</li>
);
Classify.propTypes = {
	data: React.PropTypes.array,
	title: React.PropTypes.string,
	isActive: React.PropTypes.func.isRequired,
	params:  React.PropTypes.object,
	count:  React.PropTypes.object,
	productType:   React.PropTypes.string
};

class ProductCategorySidebar extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				selected:''
			};
			this.isActive = this.isActive.bind(this);
		}

		componentWillReceiveProps (nextProps) {
			if (!isvalidRoute(this.props.productType, this.props.ProductsTbl))
				return;
			let oldId = this.props.productType;
			let newId = nextProps.product;
			let oldTblId = this.props.ProductsTbl;
			let newTblId = nextProps.ProductsTbl;

			if (oldTblId && newTblId !== oldTblId)
				this.setState({selected  : nextProps.ProductsTbl});
		}

		isActive(value){
			return ((value===this.state.selected) ?'active':'');
		}
		uniqArray(arrArg){
			let count = {};
			let a = [];
			a = arrArg.filter((elem, pos, arr) => {
				count[elem] === undefined && (count[elem] = 0);
				count[elem]++;
				return arr.indexOf(elem) == pos;
			});
			count.All = arrArg.length;
			return  {a, count};
		}
		render() {
			if (!isvalidRoute(this.props.productType, this.props.ProductsTbl)){
				return (<div/>);
			}else{
				let brands = this.uniqArray(this.props.products.map((item, index) => (item.brand)));
				let type = this.uniqArray( this.props.products.map((item, index) => (item.type)));
				return (
					<div>
						<div className="col-sm-12 cat">
							<ul >
								<Classify title="Brand:" data={brands.a} count={brands.count} isActive={this.isActive} {...this.props}/>
								<Classify title="System:" data={type.a} count={type.count} isActive={this.isActive} {...this.props}/>
							</ul>
						</div>
					</div>
				);
			}
		}
}
ProductCategorySidebar.propTypes = {
	params:  React.PropTypes.object,
	ProductsTbl:  React.PropTypes.string,
	products: React.PropTypes.array,
	productType:   React.PropTypes.string
};

export default ProductCategorySidebar;
