const axios = require('axios');

const authenticate = require('../authenticate');
const API_URL = 'https://api.spacexdata.com/v3/launches?limit=10';

module.exports = {
	Query: {
		async listAllLaunches(parent, _, { app, req, postgres }, info) {
			try {
				let allLaunches = await axios.get(API_URL);
				console.log(allLaunches.data);
				return allLaunches.data;
			} catch (e) {
				console.log('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},

		async listMyLaunches(parent, input, { app, req, postgres }, info) {
			try {
				let message = '';
				let userId = authenticate(app, req);
				console.log('this is userID: ', userId);
				const launchesPsql = {
					text: 'SELECT * FROM spaceexplorers.bookings WHERE booking_launch_user_id = $1',
					values: [userId],
				};
				let launchesDBQuery = await postgres.query(launchesPsql);
				let booked = launchesDBQuery.rows;
				let arrayOfFlightsData = await booked.map(i => {
					return axios.get(`https://api.spacexdata.com/v3/launches/${i.booking_flight_number}`);
				});

				console.log('this is arrayOfFlighDAta: ', arrayOfFlightsData);
				let uncleanedLaunches = await Promise.all(arrayOfFlightsData);
				let cleanedLaunches = uncleanedLaunches.map(element => element.data);
				console.log('this MyLaunches is: ', cleanedLaunches);

				message = 'Here are all your booked launches!';

				return cleanedLaunches;
			} catch (e) {
				console.log('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},

		async oneLaunchView(parent, input, { app, req, postgres }, info) {
			try {
				let flight = input.flight_number;
				console.log('this is flight: ', flight);
				let launch = await axios.get(`https://api.spacexdata.com/v3/launches/${flight}`);
				return launch.data;
			} catch (e) {
				console.log('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},
	},
};
