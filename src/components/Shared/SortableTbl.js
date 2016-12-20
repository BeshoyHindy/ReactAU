import React from 'react';


class SortableTbl extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				data: this.props.data || [],
				asc: (this.props.dKey || []).reduce((acc, cur) =>{ return Object.assign({}, acc, {[cur]: null});}, {})
			};
			//constructor is only invoked when the component is first created. if data change, need to update on componentWillReceiveProps
			this.sortData = this.sortData.bind(this);
		}

		componentWillMount() {
		}
		componentDidMount() {
		}
		componentWillReceiveProps(nextProps) {
			//constructor is only invoked when the component is first created. if data change, need to update on componentWillReceiveProps
			if (nextProps.data !== this.state.data) {
				this.setState({ data: nextProps.data });
			}
		}
		componentDidUpdate (prevProps, prevState) {

		}
		sortData(dKey, nAsc){
			let newAsc = this.state.asc;
			for (let prop in newAsc) {
				newAsc[prop] = null;
			}
			this.setState(
				{
					asc: Object.assign({}, newAsc, {[dKey]: nAsc}),
					data: this.state.data.slice().sort((a,b)=>{
						return nAsc? a[dKey] <= b[dKey]:a[dKey] > b[dKey];
					})
				}
			);
		}
		render() {
			return (
				<div className="download-tbl">
					<div >
						<table className="table table-hover table-striped sortable-table" >
							<thead>
							<tr>
								{
									this.props.dKey.map((item, id) => {
										return (
											<SortableTh key={id} sortData={this.sortData} asc={this.state.asc[item]}  dataKey={item} >
												{this.props.tHead[parseInt(id)]}
											</SortableTh>
									);})
								}
							</tr>
							</thead>
							<tbody>
							{
								this.state.data && this.state.data.map( (item, id) => {
									return <SortableTd key={id} data={item} dKey={this.props.dKey} customTd={this.props.customTd}/>;
								})
							}
							</tbody>
						</table>
					</div>
				</div>
			);
		}
}
SortableTbl.propTypes = {
	data: React.PropTypes.array,
	tHead: React.PropTypes.array,
	dKey: React.PropTypes.array,
	customTd: React.PropTypes.array
};





class SortableTh extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			sortCssClass: "fa fa-sort"
		};
		this.sort = this.sort.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		//constructor is only invoked when the component is first created. if data change, need to update on componentWillReceiveProps
		let a = "fa fa-sort";
		switch (nextProps.asc){
			case null:
				a = "fa fa-sort";
			break;
			case true:
				a = "fa fa-sort-amount-desc";
			break;
			case false:
				a = "fa fa-sort-amount-asc";
			break;
		}
		//console.log(a);
		if (nextProps.asc !== this.props.asc) {
			this.setState({ sortCssClass: a });
		}
	}
	sort(){
		this.props.sortData(this.props.dataKey, !this.props.asc);
	}
	render() {
		return (
			<th onClick={this.sort}> {this.props.children} <i className={this.state.sortCssClass} aria-hidden="true"/></th>
		);
	}
}
SortableTh.propTypes = {
	asc: React.PropTypes.bool,
	sortData: React.PropTypes.func.isRequired,
	dataKey:  React.PropTypes.string,
	children: React.PropTypes.node
};








const SortableTd = (props) => {
	let CustomTd = props.customTd;
	return(
		<tr>
		{
			props.dKey.map((item, id) => {
				let CustomTdComponent = null;
				CustomTdComponent = CustomTd && CustomTd.filter((i)=>{return (i.keyItem === item);})
						.reduce( (result,item) => { return item; }, {})
						.custd;

				if (!CustomTd)
					return (<td key={id} >{props.data[item]}</td>);

				if (CustomTdComponent)	{
					return (<CustomTdComponent key={id} data={props.data[item]} rowData={props.data}/>);
				}

				return (<td key={id} >{props.data[item]}</td>);
			})
		}
		</tr>
	);
};
SortableTd.propTypes = {
	data: React.PropTypes.object,
	dKey: React.PropTypes.array,
	customTd: React.PropTypes.array
};

export {SortableTbl};
