import React from 'react';


const OptionalTbl = (props) =>(
				<div className="download-tbl">
					<div >
						<table className="table table-hover table-striped " >
							<thead>
								<tr>
									<th >Optional Member</th>
								</tr>
							</thead>
							<tbody>
							{
								props.data && props.data.map( (item, id) => {
									return (
									<tr key={id}>
										<td >{item.desc}</td>
									</tr>
									);
								})
							}
							</tbody>
						</table>
					</div>
				</div>
			);

OptionalTbl.propTypes = {
	data: React.PropTypes.array
};


export {OptionalTbl};
