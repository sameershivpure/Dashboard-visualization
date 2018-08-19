const express = require('express');
const fs = require('fs');

const app = express();


// Set header to accept cross domain request
app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	next();
});

// format date to only retrive month and year
Date.prototype.formatDate = function(){
	let date = this.toDateString().split(' ');
	return date[1]+' '+date[3];
}


// middleware to read data file and store data in variable
app.use((request, response, next) => {

	fs.readFile('./utilData.json', (error, data) => {
		
		if (error){
			response.status(500).json({error:"Server error"});
		}
		
		response.data = JSON.parse(data);
		next();
	});

	
});

// route to handle request to expense page
app.get('/expense', (request, response) => {

	let result = [];
	let maxVal = 0;

		for(let index in response.data){
				
			maxVal = Math.max(maxVal, response.data[index].bill, response.data[index].savings);
			result.unshift({period:new Date(response.data[index].year, response.data[index].month-1).formatDate(),bill:response.data[index].bill, savings:response.data[index].savings});
		}

		response.status(200).json({maxValue: maxVal, result});
});

// route to handle request to power consumption page
app.get('/power', (request, response) => {

	let result = [];
	let maxVal = 0;

		for(let index in response.data){
				
			maxVal = Math.max(maxVal, response.data[index].kwh);
			result.unshift({period:new Date(response.data[index].year, response.data[index].month-1).formatDate(),consumed:response.data[index].kwh});
		}

		response.status(200).json({maxValue: maxVal, result});
});

//error middleware to handle not found error
app.use((request, response, next) => {
	
	response.status(404).json({error:"incorrect path"});
})

// middleware to handle server error
app.use((error, request, response, next) => {

	if(error)
		response.status(500).json({error:"Server error"});

	next();
});

let port = process.env.PORT || 8080;

app.listen(port);
