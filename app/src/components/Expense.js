import React, { Component } from 'react';
import Graph from './Graph';
import Table,{ TableRow } from './Table';
import { API_URL } from '../constants';


export default class Expense extends Component {

	constructor(props){
		super(props);
		this.state = {data:null}
	}

	componentDidMount(){

		fetch(API_URL+'/expense')
		.then(response => {
			if (response.status === 404)
				throw new Error(response);
			return response.json()
		})
		.then(data => {
			
			this.setState({data});
		})
		.catch(error => {console.log(error)});

	}

	render() {
		return (
			<div className="col-12 content">
				<h3>Monthly Expense</h3>
				{this.state.data && <Graph data={this.state.data} fields={['bill', 'savings']} /> }

				{this.state.data && 
					<Table headers={['Period', 'Bill (USD)', 'Savings (USD)']}> 
					{this.state.data.result.map((val, i) => (
						<TableRow key={i} data={[val.period,val.bill, val.savings]} />
					))}	
					</Table>
				}
			</div>
		);
	}
}
