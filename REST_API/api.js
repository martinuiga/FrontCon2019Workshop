const Api = require('claudia-api-builder');
const api = new Api();

const meetUps = [{
	"id": "1235-4315-f31f-gsm134fa",
	"name": "Meetup #25 - GraphQL with Amplify",
	"group": "JS Belgrade",
	"date": "2019-10-19",
	"startTime": "18:00",
	"endTime": "20:00",
	"location": "ICT Hub, Kralja Milana 10, Belgrade, Serbia",
	"description": "Long form description"
}];

api.get('/meetups', () => {
	return meetUps;
});


api.get('/meetups/{id}', (req) => {
	return meetUps.find(meetUp => req.pathParams.id === meetUp.id);
});

api.post('/meetups', (req) => {
	let meetUp = {};
	meetUp.id = req.body.id;
	meetUp.name = req.body.name;

	return meetUps.push(meetUp);
}, {
	success: {
		contentType: 'application/json',
		code: 201
	},
	error: {
		code: 404
	}
});


module.exports = api;
