import React from 'react';

class SortableTblPager extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				currPage: this.props.curr,
				rowPerPage: this.props.rowPerPage
			};
			this.setPage = this.setPage.bind(this);
			this.addPagge = this.addPagge.bind(this);
			this.subPage = this.subPage.bind(this);
			this.setCurrentPage = this.setCurrentPage.bind(this);
			this.setRowsPerPage = this.setRowsPerPage.bind(this);
			
		}
		setCurrentPage(e){			
			this.setPage(parseInt(e.target.value));
		}
		addPagge(){
			if (this.state.currPage >= this.props.totalPage -1)
				return;
			
			this.setPage(this.state.currPage + 1);
		}
		subPage(){
			if (this.state.currPage < 1)
				return;

			this.setPage(this.state.currPage - 1);
		}
		setPage(i){
			this.props.setCurrentPage(i);
			this.setState(
				{
					currPage: i
				}
			);
		}
		setRowsPerPage(e){
			let i = parseInt(e.target.value);
			if(i==='All' || isNaN(i))
				i = this.props.totalsCount;			
			this.props.setRowsPerPage(i);
			this.setState(
				{
					rowPerPage: i
				}
			);
		}
		render() {			
			let nextDisableStyle = (this.state.currPage >= (this.props.totalPage -1));
			let prevDisableStyle = (this.state.currPage < 1);

			return (
				<div className="form-group">
					<div className="pager col-sm-6 col-xs-12">
						<input type="button" className="btn btn-default" name="" disabled={prevDisableStyle} 
							onClick={this.subPage} value="Prev" />
						<select onChange={this.setCurrentPage} value={this.state.currPage} className="form-control page-select">
							{
								Array.from(new Array(this.props.totalPage), (x,i) => {return (<option key={i} value={i}>{i + 1}</option>);})
							}		
						</select>
						<input type="button" className="btn btn-default" name="" disabled={nextDisableStyle} 
							onClick={this.addPagge} value="Next"/>
						<label htmlFor="rowsPerPage"> ，display </label>
						<select id="rowsPerPage" onChange={this.setRowsPerPage} value={this.state.rowPerPage} className="form-control page-select">
							{
								[5, 10, 20 ,50, 'All'].map((item,id) => {return (<option key={id} value={item}>{item}</option>);})
							}		
						</select>
						<label>rows per page</label>
					</div>
					<div className="desc col-sm-6 col-xs-12">
						<div>Page {this.state.currPage + 1} of totlas {this.props.totalPage}, totlas {this.props.totalsCount} rows</div>
					</div>
				</div>
			);
		}
}	
SortableTblPager.propTypes = {
	curr: React.PropTypes.number.isRequired,
	rowPerPage: React.PropTypes.number.isRequired,
	totalsCount: React.PropTypes.number.isRequired,
	totalPage: React.PropTypes.number.isRequired,
	setCurrentPage: React.PropTypes.func.isRequired,
	setRowsPerPage: React.PropTypes.func.isRequired
};

export {SortableTblPager};
