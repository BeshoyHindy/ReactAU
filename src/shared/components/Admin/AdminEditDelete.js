import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DetailApi from '../../api/DetailsApi';
import { loadProductList } from '../../actions/productsActions';

class BaseProductDeleteComponent extends React.Component{
	constructor(props) {
		super(props);
		this.deleteItem = this.deleteItem.bind(this);
	}
	deleteItem(){
		DetailApi.deleteProduct(this.props.rowData._id).then( ret => {
			this.props.actions.loadProductList({params:{cat: this.props.productType || "DVR", subType:"All"}});
			ret && ret.name && alert(`Success!! Product [${ret.name}] has been deleted`);			
		}).catch(error => {
			throw(error);
		});
	}
	render () {
		return (	
			<td >	
				<input type="button" className="btn btn-danger" value="Delete" onClick={this.deleteItem}/>
			</td>
		);
	}
}

BaseProductDeleteComponent.propTypes = {
	rowData: React.PropTypes.object,
	actions: React.PropTypes.object.isRequired,
	productType: React.PropTypes.string.isRequired,
};


function mapStateToProps(state, ownProps) {
	//console.log("mapStateToProps", state);
  return {};
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({loadProductList}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(BaseProductDeleteComponent);
