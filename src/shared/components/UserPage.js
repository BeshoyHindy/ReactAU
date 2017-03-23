if (process.env.BROWSER) {
	require ('../Sass/user.sass');
}

import { connect } from 'react-redux';
import React from 'react';
import update from 'immutability-helper';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs-isomorphic';

import connectDataFetchers from '../lib/connectDataFetchers.jsx';
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
	componentDidMount() {
	}
	setTab(tabId){
		let t = parseInt(tabId);
		this.setState({selectedTab:t});		
	}
		
	render () {
		idCounter=0;
		let {authSuccess, user} = this.props;
		if(this.props.errorMessage){
			alert(this.props.errorMessage);
		}		
		return (
		<div className="container">
			<div className="row">
				<div className="col-xs-12">
					<Breadcrumb linkPair={[{link:"", desc:"User"},{link:"/user", desc:"User Profile"},]}/>					
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
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
		);
	}
}


UserPage.propTypes = {
	authSuccess:  React.PropTypes.bool.isRequired,
	user:  React.PropTypes.object,
	errorMessage: React.PropTypes.string,	
};

function mapStateToProps(state, ownProps) {
  return {
	authSuccess: state.auth.success,
	user: state.auth.user,
	errorMessage: state.auth.error	
  };
}

export default connect(mapStateToProps)(connectDataFetchers(UserPage, [ ]));
