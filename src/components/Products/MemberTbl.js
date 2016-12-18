import React from 'react';


const MemberTbl = (props) =>(
				<div className="download-tbl">
					<div >
						<table className="table table-hover table-striped " >
							<thead>
							<tr>
								<th >Description</th>
								<th >Qty</th>
							</tr>
							</thead>
							<tbody>
							{
								props.data && props.data.map( (item, id) => {
									return (
									<tr key={id}>
										<td >{item.desc}</td>
										<td >{item.qty}</td>
									</tr>
									);
								})
							}
							</tbody>
						</table>
					</div>
				</div>
			);

MemberTbl.propTypes = {
	data: React.PropTypes.array
};


export {MemberTbl};
