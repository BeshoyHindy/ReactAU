import { connect } from 'react-redux';
import React from 'react';
import update from 'immutability-helper';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs-isomorphic';

import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { Breadcrumb , BigHeader, OrangeBoard, isEmptyObject} from "./Shared/Shared";
import { loadCategories } from '../actions/adminActions';
import EditUserTab from './User/EditUserTab.js';
import UserProfileTab from './User/UserProfileTab.js';

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
	setTab(tabId){
		let t = parseInt(tabId);
		this.setState({selectedTab:t});		
	}
	
	render () {
		idCounter=0;
		let {authSuccess} = this.props;
		return (
		<div>
			<div className="row">
				<div className="col-xs-12">
					<Breadcrumb linkPair={[{link:"", desc:"User"},{link:"user", desc:"User Profile"},]}/>
					<BigHeader smallTitle="">User Profile</BigHeader>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<div className="loading-wrap">
						<div className={`ajax-loading-big ${(!authSuccess) ?'fade-show':'fade-hide'}`} >
							<img src="/img/ajax-loader.gif" alt=""/>
							<div className="ajax-loading-progress">
								loading....
							</div>
						</div>	
						<Tabs selectedIndex={this.state.selectedTab}	generateIdsFn={generateIds}>
							<TabList>
								<Tab>User Profile</Tab> 
								<Tab>Edit Profile</Tab> 
							</TabList>

							<TabPanel>
								<UserProfileTab/>
							</TabPanel>

							<TabPanel>
								<EditUserTab/>
							</TabPanel>

						</Tabs>
					</div>
				</div>
			</div>
		</div>		
		);
	}
}


UserPage.propTypes = {
	authSuccess:  React.PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
	authSuccess: state.auth.success,
  };
}

export default connect(mapStateToProps)(
    connectDataFetchers(UserPage, [ loadCategories ])
);
