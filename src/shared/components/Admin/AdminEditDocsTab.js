import React from 'react';
import update from 'immutability-helper';

import AdminEditSpecBlock from "./AdminEditSpecBlock";
import { SortableTbl }  from '../Shared/SortableTbl';
import {CustomDel} from "./SortabletblCustomInput.js";

class AdminEditDocsTab extends React.Component{
	constructor(props) {
		super(props);
		this.delItem = this.delItem.bind(this);
		this.changeDocs = this.changeDocs.bind(this);
		this.deleteInsertDocs = this.deleteInsertDocs.bind(this);
	}
	componentWillReceiveProps(nextProps) {
	
	}
	delItem(e){
		this.props.delArrayMember(this.props.tabId, this.props.field, parseInt(e.target.getAttribute("data-id"))-1);
	}
	changeDocs(e){
		let files = e.target.files;
		let nDocs=[...this.props.newDocs];

		for(let id in files){
			let file = files[id];
			if (file && file.type) {
				// console.log(file);
				nDocs.push({file});
				console.log(nDocs);					
			}
		}
		this.props.setNewDocs(this.props.tabId, this.props.fileField, nDocs);				
	}
	deleteInsertDocs(e){
		let id = parseInt(e.target.getAttribute("data-id"));
		let nDocsFile=[
					...this.props.newDocs.slice( 0, id) ,
					...this.props.newDocs.slice( id+1, this.props.newDocs.length)
			];
		this.props.setNewDocs(this.props.tabId, this.props.fileField, nDocsFile);
	}
	getNewInsertTbl(){
		if (!this.props.newDocs.length )
			return <div/>;
		
		return(
			<table className="table table-striped table-bordered table-hover admin-docs-tbl">
				<thead>
					<tr>
						<th>File Name</th>
						<th>Size(KB)</th>
						<th>File Type</th>
						<th>Delete </th>
					</tr>
				</thead>
				<tbody>
				{
					this.props.newDocs.map(
						(item,id)=> {
							return (
								<tr key={id}>
									<td>{item.file.name}</td>
									<td>{Math.ceil(item.file.size / 1024)}</td>
									<td>{item.type}</td>
									<td key={id}  className="td-delete-item">
										<i className="fa fa-close icon-item delete-item delete-item-rigth" data-id={id} onClick={this.deleteInsertDocs}/>
									</td> 
								</tr>
							);
					})
				}
				</tbody>
			</table>	
		);
	}
	render () {
		let tblData = this.props.docs.map((item, id)=>{item.id=id+1; return item});
		return (
		<div className="">
			<ul className="fa-ul">
				<li><i className="fa-li fa fa-check-square"/>將上傳之檔案</li>			
				<li><input type="file" accept='*' className="form-control" id="uploadDocs" name="uploadDocs" multiple value="" onChange={this.changeDocs}/></li>
				<li>{this.getNewInsertTbl()}
				</li>
				<li><i className="fa-li fa fa-check-square"/>已上傳之檔案</li>
				<li>
					<SortableTbl tblData={tblData}
						tHead={["ID","Description","Size(KB)","File Type","Delete"]}
						customTd={[{custd: CustomDel, keyItem: "del"}]}
						dKey={["id","desc","size","filetype", "del"]} 
						delItem={this.delItem}/>
				</li>
			</ul>
		</div>
		);
	}
}


AdminEditDocsTab.propTypes = {
	spec: React.PropTypes.array,
};

export default AdminEditDocsTab;
