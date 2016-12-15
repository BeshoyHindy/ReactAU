let Griddle = require('griddle-react');

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import {nav, isvalidRoute} from '../../Data/RouteData';
import { Metadata } from "../../Data/ProductTblSettings";

class ProductsTbl extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				products:[]
			};
			this.fetchData = this.fetchData.bind(this);
		}

		componentDidUpdate (prevProps, prevState) {
			if (!isvalidRoute(this.props.params.product, this.props.params.ProductsTbl))
				return;
			let oldId = prevProps.params.product + prevProps.params.ProductsTbl;
			let newId = this.props.params.product + this.props.params.ProductsTbl;
			if (oldId && newId !== oldId){
				this.fetchData()
			}
		}
		componentWillMount() {
			if ( this.props.params.product && Metadata[this.props.params.product]){
				this.fetchData();
			}
		}

		fetchData(){
			if (!isvalidRoute(this.props.params.product, this.props.params.ProductsTbl))
				return;


			axios({
				method: 'get',
				url: '/json/'+this.props.params.product+'.json',
				dataType: 'JSON'
			})
			.then( (response) => {
				let filtered = response.data;
				if (this.props.params.ProductsTbl && this.props.params.ProductsTbl !== "All"){
					//this.refs.Griddle.setFilter(this.props.params.ProductsTbl);
					filtered = response.data.filter( item => {
						return item.type == this.props.params.ProductsTbl
							|| item.brand == this.props.params.ProductsTbl;
					})
				}
				this.setState({
					products: filtered
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		}

		componentDidMount() {


		}
		render() {
			if ( !this.props.params.product || !Metadata[this.props.params.product]){
				return (<div>

				</div>);
			}else{
				return (
						<Griddle results={this.state.products} tableClassName="table" columnMetadata={Metadata[this.props.params.product]} showFilter={true} showSettings={true}
							columns={["imageUrl","brand", "type", "name", "channel", "remote", "backup", "videoout"]}
							sortAscendingComponent={<span className="fa fa-sort-amount-asc"></span>}
							sortDescendingComponent={<span className="fa fa-sort-amount-desc"></span>}
							sortDefaultComponent={<span className="fa fa-sort "></span>}
							useGriddleStyles={false}
							ref='Griddle'
							/>
				);
			}
		}

}

export {ProductsTbl};
