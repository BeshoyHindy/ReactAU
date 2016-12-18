import React from 'react';


class DownloadTbl extends React.Component{
		constructor(props) {
			super(props);
		}

		componentWillMount() {

		}
		componentDidMount() {


		}
		componentDidUpdate (prevProps, prevState) {

		}
		render() {
			return (
				<div className="download-tbl">
					<div >
						<table className="table table-hover table-striped " >
							<thead>
							<tr>
								<th >Description</th>
								<th >Size(KB)</th>
								<th >File Type</th>
								<th >Download</th>
							</tr>
							</thead>
							<tbody>
							{
								this.props.data && this.props.data.map( (item, id) => {
									return (
									<tr key={id}>
										<td >{item.desc}</td>
										<td >{item.size}</td>
										<td >{item.filetype}</td>
										<td > <a href="/json/docs/spec.pdf" target="_blank">Download </a></td>
									</tr>
									);
								})
							}
							</tbody>
						</table>
					</div>
				</div>
			);
		}
}
DownloadTbl.propTypes = {
	data: React.PropTypes.array
};


export {DownloadTbl};
