import React from 'react';


class SpecTbl extends React.Component{
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
				<div id="p-spec" className="table-responsive">
					<table className="table table-striped table-bordered table-hover p-spec">
					{
						this.props.data && this.props.data.map( (item, i) => {
							return (
								<tbody key={i}>
									<tr>
									<td colSpan="2">{item.name}</td>
									</tr>
									{
										item.members.map((v, id) => {
											return (
												<tr  key={id}>
													<td>{v.name}</td>
													<td>{v.details}</td>
												</tr>
											);
										})
									}
								</tbody>
							);
					})}

					</table>
				</div>
			);
		}

}
SpecTbl.propTypes = {
  data: React.PropTypes.array
};


export {SpecTbl};
