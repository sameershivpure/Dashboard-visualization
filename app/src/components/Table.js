import React, { Component } from 'react';

export const TableHeader = (props) =>{
	let cols = props.headers.map((item,i) => (<th className="col text-center" key={i} >{item}</th>))
	return (<thead>
				<tr className="row">
				{cols}
				</tr>
			</thead>
	);
}

export const TableRow = (props) => {
	let cols = props.data.map((item,i) => (<td className="col text-center" key={i} >{item}</td>))
	return(
		<tr className="row">
			{cols}
		</tr>
	);
}

export default class Table extends Component {
	render() {
		return (
			<div className="col-12">
				<table className="table">
					<TableHeader headers={this.props.headers}/>
					<tbody>
						{this.props.children}
					</tbody>
				</table>
			</div>
		);
	}
}
