import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';


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
				<div id="p-spec">
					<table className="table table-striped table-bordered table-hover p-spec">
					{
						this.props.spec && this.props.spec.map( (item, i) => {
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
  spec: React.PropTypes.array
};


export {SpecTbl};
