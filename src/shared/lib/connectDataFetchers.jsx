import React, { PropTypes } from 'react';
import _map from "lodash/fp/map";
import _flattenDeep from "lodash/fp/flattenDeep";
import _flow from "lodash/fp/flow";
import _filter from "lodash/fp/filter";

import * as actions from '../actions/authAction';

let IS_FIRST_MOUNT_AFTER_LOAD = true;

export default function connectDataFetchers(Component, actionCreators) {
    return class DataFetchersWrapper extends React.Component {
        static contextTypes = { i18n: PropTypes.object };

        static propTypes = {
            dispatch : PropTypes.func.isRequired,
            params   : PropTypes.object.isRequired,
            location : PropTypes.shape({
                pathname : PropTypes.string.required,
                search   : PropTypes.string,
                query    : PropTypes.string.object
            }).isRequired
        };

        static fetchData({ dispatch, params = {}, query = {},  route= [], device}) {          

            let promiseArray = actionCreators.map(actionCreator => {                    
                    return actionCreator?(dispatch(actionCreator({ params, query,  device }))):null;
                });       

            if (process.env.BROWSER && route.authorize && route.authorize.length){
                promiseArray.concat( route.authorize.map( role => {
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
            const { location } = this.props;
            const { location: prevLocation } = prevProps;

            const isUrlChanged = (location.pathname !== prevLocation.pathname)
                              || (location.search !== prevLocation.search);

            if (isUrlChanged) {
                this._fetchDataOnClient();
            }
        }

        componentDidMount() {
            if (IS_FIRST_MOUNT_AFTER_LOAD) {

                let {dispatch, routes} = this.props; 
                const routeRoles = _flow(
                    _filter(item => item.authorize), // access to custom attribute
                    _map(item => item.authorize),
                    _flattenDeep,                    
                )(routes);

                if (process.env.BROWSER && routeRoles && routeRoles.length){
                    let promiseArray =  routeRoles.map( role => {
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
                params   : this.props.params,
                query    : this.props.location.query,
                route    : this.props.route
            });
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    };
}
