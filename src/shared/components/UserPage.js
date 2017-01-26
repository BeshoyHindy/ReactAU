import { connect } from 'react-redux';
import React from 'react';
import update from 'immutability-helper';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs-isomorphic';

import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { Breadcrumb , BigHeader, OrangeBoard, isEmptyObject} from "./Shared/Shared";
import { loadCategories } from '../actions/adminActions';

let idCounter = 0;
const generateIds = () => `custom-id-${idCounter++}`

class UserPage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			selectedTab : 0,
		};
		this.setTab = this.setTab.bind(this);
	}
	componentDidMount() {
		if (!this.props.auth.success){
			this.props.router.push(`/signin`);	
		}
	}	
	componentWillReceiveProps(nextProps) {
		if (!this.props.auth.success){
			this.props.router.push(`/signin`);	
		}
	}	
	setTab(tabId){
		let t = parseInt(tabId);
		this.setState({selectedTab:t});		
	}
	
	render () {
		let tabId=0;
		let {ajaxState, auth} = this.props;
		return (
	<div className="loading-wrap">
		<div className={`ajax-loading-big ${((ajaxState > 0) || (!auth.success)) ?'fade-show':'fade-hide'}`} >
			<img src="/img/ajax-loader.gif" alt=""/>
			<div className="ajax-loading-progress">
				Processing....
			</div>
		</div>
			<div className="row">
				<div className="col-xs-12">
					<Breadcrumb linkPair={[{link:"", desc:"User"},{link:"user", desc:"User Profile"},]}/>
					<BigHeader smallTitle="">User Profile</BigHeader>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<Tabs selectedIndex={this.state.selectedTab}	generateIdsFn={generateIds}>
						<TabList>
							<Tab>User Profile</Tab> 
							<Tab>Edit Profile</Tab> 
						</TabList>

						<TabPanel>
							<div className="well user-info">
								<table className="table table-striped table-bordered table-hover p-spec">
									<tbody>
										<tr>
											<td>Field</td>
											<td>Data</td>
										</tr>
										<tr>
											<td>User Name</td>
											<td>{auth.user.profile && auth.user.profile.username}</td>
										</tr>
										<tr>
											<td>User E-Mail</td>
											<td>{auth.user.email }</td>
										</tr>
										<tr>
											<td>User Total Purchase </td>
											<td>{auth.user.data && auth.user.data.totalValue}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</TabPanel>

						<TabPanel>
							
						</TabPanel>

					</Tabs>
				</div>
			</div>

	</div>		
		);
	}
}


UserPage.propTypes = {
	ajaxState: React.PropTypes.number,
	user:  React.PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
	auth: state.auth,
	ajaxState: state.ajaxCallsInProgress
  };
}

UserPage = connect(mapStateToProps)(
    connectDataFetchers(UserPage, [ loadCategories ])
);

export default UserPage;
