import React, { PropTypes } from 'react';

import { getDevice } from '../actions/deviceAction';
import { loadCategories } from '../actions/adminActions';

let IS_FIRST_MOUNT_AFTER_LOAD = true;
const commonActions = [getDevice, loadCategories];

export default function connectDataFetchers(Component, actionCreators) {
    return class DataFetchersWrapper extends React.Component {
        static propTypes = {
				dispatch : PropTypes.func.isRequired,
				match   : PropTypes.shape({
                path 	: PropTypes.string.required,
                url   	: PropTypes.string,
                params  : PropTypes.string.object
            }).isRequired,
        };

        static fetchData({ dispatch, params = {}, authorize= [], device}) {          
            let promiseArray = actionCreators.map(actionCreator => {                    
                    return actionCreator?(dispatch(actionCreator({ params, device }))):null;
                });       

            if (process.env.BROWSER && authorize && authorize.length){
                promiseArray.concat( authorize.map( role => {
                    switch (role) {
                        case "admin":
                            return dispatch(actions.userCheckAdmin());
                        case "normal":
                            return dispatch(actions.userCheckAuth());
                        case "reAuth":
                            return dispatch(actions.userReAuth());
                        default:
                            return null;
                    }
                } ));
            }
            return Promise.all( promiseArray );
        }
        componentDidUpdate(prevProps) {
            const { location , dispatch} = this.props;
            const { location: prevLocation } = prevProps;

            const isUrlChanged = (location.pathname !== prevLocation.pathname)
                              || (location.search !== prevLocation.search);

            if (isUrlChanged) {
                this._fetchDataOnClient();
            }			
        }

        componentDidMount() {
			let {authorize, dispatch} = this.props;
            if (IS_FIRST_MOUNT_AFTER_LOAD) {
                if (process.env.BROWSER && authorize && authorize.length){
                    let promiseArray =  authorize.map( role => {
                        switch (role) {
                            case "admin":
                                return dispatch(authActions.userCheckAdmin());
                            case "normal":
                                return dispatch(authActions.userCheckAuth());
                            case "reAuth":
                                return dispatch(authActions.userReAuth());
                            default:
                                return null;
                        }
                    } );
                    Promise.all( promiseArray );
                }
            }else{
                this._fetchDataOnClient();
            }
            IS_FIRST_MOUNT_AFTER_LOAD = false;
        }


        _fetchDataOnClient() {
            DataFetchersWrapper.fetchData({
                dispatch : this.props.dispatch,
                params   : this.props.match.params,
                authorize    : this.props.authorize
            });
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    };
}


