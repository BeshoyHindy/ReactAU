if (process.env.BROWSER) {
	require ('./user.sass');
}

import { connect } from 'react-redux';
import React from 'react';
import update from 'immutability-helper';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs-isomorphic';

import { Breadcrumb} from "./Shared/Shared";
import EditUserTab from './User/EditUserTab.js';
import UserProfileTab from './User/UserProfileTab.js';
import RatedProductTab from './User/RatedProductTab.js';
import FavoriteProductTab from './User/FavoriteProductTab.js';

let idCounter = 0;
const generateIds = () => `custom-id-${idCounter++}`;

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
		let {authSuccess, user} = this.props;
		return (
		<div className="container">
			<div className="row">
				<div className="col-xs-12">
					<Breadcrumb linkPair={[{link:"", desc:"User"},{link:"user", desc:"User Profile"},]}/>					
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<div className="loading-wrap">
						<div className={`ajax-loading-big ${(!authSuccess || !user) ?'fade-show':'fade-hide'}`} >
							<img src="/img/ajax-loader.gif" alt=""/>
							<div className="ajax-loading-progress">
								loading....
							</div>
						</div>	
						<Tabs selectedIndex={this.state.selectedTab}	generateIdsFn={generateIds}>
							<TabList>
								<Tab>Basic Info</Tab> 
								<Tab>Edit Profile</Tab> 
								<Tab>Rated Products</Tab> 
								<Tab>Favorited Products</Tab> 
							</TabList>

							<TabPanel>
								<UserProfileTab/>
							</TabPanel>

							<TabPanel>
								<EditUserTab/>
							</TabPanel>

							<TabPanel>
								<RatedProductTab/>
							</TabPanel>

							<TabPanel>
								<FavoriteProductTab/>
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
	user:  React.PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
	authSuccess: state.auth.success,
	user: state.auth.user,
  };
}

export default connect(mapStateToProps)(UserPage);
