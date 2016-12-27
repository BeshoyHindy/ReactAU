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
			this.setPage(parseInt(e.target.value))
		}
		addPagge(){
			this.setPage(this.state.currPage + 1)
		}
		subPage(){
			this.setPage(this.state.currPage - 1)
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
			return (
				<div className="form-group">
					<div className="pager col-sm-6 col-xs-12">
						<input type="button" className="btn btn-default" name="" value="上一頁"/>
						<select onChange={this.setCurrentPage} value={this.state.currPage} className="form-control page-select">
							{
								Array.from(new Array(this.props.totalPage), (x,i) => {return (<option key={i} value={i}>{i + 1}</option>);})
							}		
						</select>
						<input type="button" className="btn btn-default" name="" value="下一頁"/>
						<label htmlFor="rowsPerPage"> ，每頁顯示</label>
						<select id="rowsPerPage" onChange={this.setRowsPerPage} value={this.state.rowPerPage} className="form-control page-select">
							{
								[5, 10, 20 ,50, 'All'].map((item,id) => {return (<option key={id} value={item}>{item}</option>);})
							}		
						</select>
						<label>筆</label>
					</div>
					<div className="desc col-sm-6 col-xs-12">
						<div>第 {this.state.currPage + 1} 頁，共 {this.props.totalPage} 頁，{this.props.totalsCount} 筆{}</div>
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
