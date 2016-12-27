import React from 'react';


class SortableTbl extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				data: this.props.tblData || [],
				asc: (this.props.dKey || []).reduce((acc, cur) =>{ return Object.assign({}, acc, {[cur]: null});}, {}),
				filter: ""
			};
			//constructor is only invoked when the component is first created. if data change, need to update on componentWillReceiveProps
			this.sortData = this.sortData.bind(this);
			this.filter = this.filter.bind(this);
		}

		componentWillMount() {
		}
		componentDidMount() {
		}
		componentWillReceiveProps(nextProps) {
			//constructor is only invoked when the component is first created. if data change, need to update on componentWillReceiveProps
			if (nextProps.tblData !== this.state.data) {
				this.setState({ data: nextProps.tblData });
			}
		}
		componentDidUpdate (prevProps, prevState) {

		}
		filter(e){
			let newData = this.props.tblData.filter((item)=>{
				for (let key in item) {
					let v = item[key].toString().toLowerCase();
					if (v.indexOf(e.target.value.toLowerCase()) !== -1 ) {
						return true;
					}
				}
				return false;
			});
			this.setState({
				filter: e.target.value,
				data: newData
			});
		}
		sortData(dKey, nAsc){
			let newAsc = this.state.asc;
			let newData = this.state.data;
			newData.sort((a,b)=>{
				if (a[dKey] === b[dKey])
					return 0;
				if (nAsc ? a[dKey] > b[dKey] : a[dKey] < b[dKey])
					return 1;
				if (nAsc ? a[dKey] < b[dKey] : a[dKey] > b[dKey])
					return -1;
				return 0;
			});
			for (let prop in newAsc) {
				newAsc[prop] = null;
			}
			this.setState(
				{
					asc: Object.assign({}, newAsc, {[dKey]: nAsc}),
					data: newData
				}
			);
		}
		render() {
			return (
				<div className="table-responsive">
					<div className="sortable-table">
						<div className="search-box">
							Search: <input className="search" type="text" name="" value={this.state.filter} placeholder="Filter Result" onChange={this.filter} />
						</div>
						<table className="table table-hover table-striped" >
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
									return <SortableTd key={id} tdData={item} {...this.props} dKey={this.props.dKey} customTd={this.props.customTd}/>;
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
	tblData: React.PropTypes.array,
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
				a = "fa fa-sort-amount-asc";
			break;
			case false:
				a = "fa fa-sort-amount-desc";
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
					return (<td key={id} >{props.tdData[item]}</td>);

				if (CustomTdComponent)	{
					return (<CustomTdComponent key={id} {...props} tdData={props.tdData[item]} rowData={props.tdData}/>);
				}

				return (<td key={id} >{props.tdData[item]}</td>);
			})
		}
		</tr>
	);
};
SortableTd.propTypes = {
	tdData: React.PropTypes.object,
	dKey: React.PropTypes.array,
	customTd: React.PropTypes.array
};

export {SortableTbl};
