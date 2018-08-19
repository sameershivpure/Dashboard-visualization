import React, { Component } from 'react';

export default class Graph extends Component {

	createChart = (data, fields) => {

		// set canvas width and height to block size
		let cWidth = this.cvBlock.clientWidth;
		let cHeight = this.cvBlock.clientHeight;

		this.canvas.width = cWidth;
		this.canvas.height = cHeight;
		
		// get canvas context
		let ctx = this.canvas.getContext('2d');

		let lm = 10;
		let bm = 40;

		//background
		ctx.fillStyle = "#fcfcfc";
		ctx.fillRect(lm, 0, cWidth, cHeight-bm);

		// function to draw lines on canvas
		let plotLine = (x1,y1,x2,y2, clr="#000") => {
			ctx.strokeStyle = clr;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
			ctx.closePath();
		}

		// function to add text on canvas
		let addText = (text, x, y, style, pos='start', base='bottom', ft='10px Arial') => {

			ctx.fillStyle = style;
			ctx.font = ft;
			ctx.textAlign = pos;
			ctx.textBaseline = base;
			ctx.fillText(text, x, y);
		}


		// plot axis
		plotLine(lm, 0, lm, cHeight-bm); // y axis
		plotLine(lm, cHeight-bm, cWidth, cHeight-bm);// x axis


		let xStep = (cWidth-lm*3.2) / data.result.length;
		let x1 = lm;
		let yb1,ys1,yc1;
		yb1 = ys1 = yc1 = cHeight - bm; 
		let scale = (cHeight - 2*bm) / data.maxValue;
		console.log(fields);
		// parse data to draw points
		for(let i in data.result){


			// draw points for bill amount
			if (fields.includes('bill')){
				let yb = Math.abs((cHeight - bm) - data.result[i].bill*scale);
				plotLine(x1, yb1, x1+xStep, yb, '#034bbf');
				addText('$'+ data.result[i].bill, x1+xStep, yb-5, '#034bbf', 'center', 'bottom');
				yb1 = yb;

			}

			// draw points if savings data exists
			if (fields.includes('savings')){
				let ys = Math.abs((cHeight - bm) - data.result[i].savings*scale);
				plotLine(x1, ys1, x1+xStep, ys, '#029130');
				addText('$'+ data.result[i].savings, x1+xStep, ys-5, '#029130', 'center', 'bottom');
				ys1 = ys;
			}

			// draw points for the power consumption
			if (fields.includes('consumed')){
				let yc = Math.abs((cHeight - bm) - data.result[i].consumed*scale);
				plotLine(x1, yc1, x1+xStep, yc, '#af0707');
				addText(data.result[i].consumed+ ' Kwh', x1+xStep, yc-5, '#af0707', 'center', 'bottom');
				yc1 = yc;
			}
			
			x1 += xStep;
			addText(data.result[i].period, x1, cHeight - (30), 'Black', 'center', 'top');

			if (fields.includes('consumed')){

				addText('Power Utilized', cWidth*0.35, cHeight - (20), '#af0707', 'center', 'top', '15px Arial');
			}

			if (fields.includes('bill')){

				addText('Total Bill', cWidth*0.35, cHeight - (20), '#034bbf', 'center', 'top', '15px Arial');
			}

			if (fields.includes('savings')){

				addText('Savings', cWidth*0.65, cHeight - (20), '#029130', 'center', 'top', '15px Arial');
			}
		}
	}

	componentDidMount(){

		if (this.props.data !== null)
			this.createChart(this.props.data, this.props.fields);
	}

	componentDidUpdate(){

		if (this.props.data !== null)
			this.createChart(this.props.data, this.props.fields);
	}

	render() {
		return (
			<div className="col-12 chart-block" ref={(id) => {this.cvBlock = id}} >
					<canvas ref={(id) => {this.canvas = id}} />
			</div>
		);
	}
}
