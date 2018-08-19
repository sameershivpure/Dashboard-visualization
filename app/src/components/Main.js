import React, { Component } from 'react';
import Graph from './Graph';
import Table,{ TableRow } from './Table';
import { API_URL } from '../constants';

export default class Main extends Component {

	constructor(props){
		super(props);
		this.state = {data:null}
	}

	componentDidMount(){
		
		fetch(API_URL+'/power')
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
				<h3>Monthly Power Usage</h3>
				{this.state.data && <Graph data={this.state.data} fields={['consumed']}/> }
				
				{this.state.data && 
					<Table headers={['Period', 'Power Consumed (KWh)']}> 
					{this.state.data.result.map((val, i) => (
						<TableRow key={i} data={[val.period,val.consumed]} />
					))}	
					</Table>
				}
			</div>
		);
	}
}
