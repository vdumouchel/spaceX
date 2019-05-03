const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 12;
const crypto = require('crypto');
const Promise = require('bluebird');
const authenticate = require('../authenticate');
const quantityAvail = require('./decrementQuantityAvailable');
const totalItemSold = require('./incrementQuantitySold');
const buildUpdate = require('../utils/buildUpdate');
/* For Emergencies only */
const emergencysignup = require('./signup'); /* <-- Use Me for emergencies */
/* For Emergencies only */

const axios = require('axios');
const API_URL = 'https://api.spacexdata.com/v3/launches?limit=10?';

module.exports = {
	Mutation: {
		async signUp(parent, { input }, { req, app, postgres }) {
			try {
				let signUpEmail = input.user_email.toLowerCase();
				let hashedSignUpPassword = await bcrypt.hash(input.user_password, saltRounds);

				const newUserInsert = {
					text:
						' INSERT INTO spaceexplorers.users (user_fullname, user_username, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING *',
					values: [input.user_fullname, input.user_username, signUpEmail, hashedSignUpPassword],
				};
				let insertNewUserResult = await postgres.query(newUserInsert);

				let myjwttoken = await jwt.sign(
					{
						data: insertNewUserResult.rows[0].user_id,
						exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
					},
					'secret'
				);

				req.res.cookie('spaceexplorers_app', myjwttoken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
				});

				if (insertNewUserResult) {
					signUpMessage = `Amazing! Welcome to spaceexplorers!`;
				} else {
					signUpMessage = 'Login failed. Please try again!';
				}

				return {
					message: signUpMessage,
				};
			} catch (e) {
				console.error('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},
		async login(parent, { input }, { req, app, postgres }) {
			try {
				let loginEmail = input.user_email.toLowerCase();

				let loginPassword = input.user_password;

				const emailFromUser = {
					text: 'SELECT user_id, user_password FROM spaceexplorers.users WHERE user_email = $1',
					values: [loginEmail],
				};

				let dbEmailQuery = await postgres.query(emailFromUser);

				let comparedPasswords = await bcrypt.compare(loginPassword, dbEmailQuery.rows[0].user_password);

				console.log('this is dbEmailQuery user_id: ', dbEmailQuery.rows[0].user_id);

				if (comparedPasswords) {
					let myjwttoken = await jwt.sign(
						{
							data: dbEmailQuery.rows[0].user_id,
							exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
						},
						'secret'
					);

					req.res.cookie('spaceexplorers_app', myjwttoken, {
						httpOnly: true,
						secure: process.env.NODE_ENV === 'production',
					});

					loginMessage = 'You successfully logged in!';
				} else {
					loginMessage = 'Login failed. Please try again!';
				}

				return {
					message: loginMessage,
				};
			} catch (e) {
				console.error('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},
		// async bookLaunch(parent, input, { req, app, postgres }) {
		// 	try {
		// 		let userId = authenticate(app, req);
		// 		console.log('userId:', userId);
		// 		console.log('Showing the desired trip to book: ', input);
		// 		//declaring Schema variables
		// 		let message = '';
		// 		let launchBooked = '';

		// 		let selectedLaunchId = input.flight_number;
		// 		console.log('input:', input.flight_number);
		// 		let i = await axios.get(`https://api.spacexdata.com/v3/launches/${input.flight_number}`);
		// 		let launch = i.data;
		// 		// console.log(launch);
		// 		// console.log(typeof launch);
		// 		console.log('this is launchLaunchsite:', launch.launch_site);
		// 		const bookingPsql = {
		// 			text:
		// 				'INSERT INTO spaceexplorers.bookings ( booking_flight_number, booking_rocket_id, booking_rocket_type, booking_mission_name, booking_mission_patch, booking_launch_year, booking_launch_site_name_long, booking_launch_user_id, booking_launch_is_booked, booking_launch_date_local) VALUES ($1, $2,$3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
		// 			values: [
		// 				launch.flight_number,
		// 				launch.rocket.rocket_id,
		// 				launch.rocket.rocket_type,
		// 				launch.mission_name,
		// 				launch.links.mission_patch,
		// 				launch.launch_year,
		// 				launch.launch_site.site_name_long,
		// 				userId,
		// 				true,
		// 				launch.launch_date_local,
		// 			],
		// 			// text:
		// 			// 	'INSERT INTO spaceexplorers.bookings (booking_flight_number, booking_rocket_id, booking_launch_year) VALUES ($1, $2, $3) RETURNING *',
		// 			// values: [launch.flight_number, launch.rocket.rocket_id, launch.launch_year],
		// 		};

		// 		let bookingDBQuery = await postgres.query(bookingPsql);
		// 		console.log('this is bookingDBQuery: ', bookingDBQuery.rows[0]);
		// 		message = 'You sucessfully booked a Launch! Have a good Trip!';
		// 		launchBooked = launch;

		// 		return {
		// 			message: message,
		// 			launchBooked: launchBooked,
		// 		};
		// 	} catch (e) {
		// 		console.log('Sorry! This returned an error of: ', e.message);
		// 		throw e.message;
		// 	}
		// },

		async bookLaunch(parent, input, { req, app, postgres }) {
			try {
				let userId = authenticate(app, req);
				console.log('This is input.flight_number: ', input.flight_number);
				let message = '';
				let launch = await axios.get(`https://api.spacexdata.com/v3/launches/${input.flight_number}`);
				const bookingPsql = {
					text:
						'INSERT INTO spaceexplorers.bookings (booking_flight_number, booking_launch_user_id) VALUES ($1, $2) RETURNING *',
					values: [input.flight_number, userId],
				};

				const bookingDBQuery = await postgres.query(bookingPsql);
				console.log('this is bookingDBQuery: ', bookingDBQuery.rows[0]);

				message = 'You sucessfully booked a Launch! Have a good Trip!';
				launchBooked = launch.data;
				return {
					message: message,
					launchBooked: launchBooked,
				};
			} catch (e) {
				console.log('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},
	},
};
