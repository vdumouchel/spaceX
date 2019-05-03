const { Pool } = require('pg');
const squel = require('squel').useFlavour('postgres');
const config = require('../config/default.json');

const userSeeds = [
	{
		user_fullname: 'Simon Stern',
		user_username: 'simistern',
		user_email: 'simon@simon.stern',
		user_password: '',
		user_date_joined: '2017-08-15 21:05:15.723336-04',
	},
	{
		user_fullname: 'Akshay IronA',
		user_username: 'IronA',
		user_email: 'akshay@akshay.com',
		user_password: '',
		user_date_joined: '2019-03-02 17:33:12.723336-04',
	},
];

const bookingSeeds = [
	{
		booking_id: 1,
		booking_flight_number: 1,
		booking_mission_name: 'FalconSat',
		booking_rocket_id: 'falcon9',
		booking_mission_patch: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
		booking_launch_year: '2006',
		booking_launch_date_local: '2006-03-25T10:30:00+12:00',
		booking_launch_site_name_long: 'Cape Canaveral Air Force Station Space Launch Complex 40',
		booking_launch_is_booked: 0,
		booking_launch_user_id: 1,
		booking_date: '2019-04-14 17:33:12.723336-04',
	},
];

const seed = async () => {
	const pg = await new Pool(config.db).connect();

	try {
		await pg.query('BEGIN');

		console.log('Seeding Users & Bookings...');

		await Promise.all(
			userSeeds.map(userSeed =>
				pg.query(
					squel
						.insert()
						.into('spaceexplorers.users')
						.setFields(userSeed)
						.toParam()
				)
			)
		);

		await Promise.all(
			bookingSeeds.map(bookingSeed =>
				pg.query(
					squel
						.insert()
						.into('spaceexplorers.bookings')
						.setFields(bookingSeed)
						.toParam()
				)
			)
		);

		/* TODO more seeds, one for each table you need to seed */
		console.log('Seeding Users & Bookings [DONE]');
		await pg.query('COMMIT');
	} catch (e) {
		await pg.query('ROLLBACK');
		throw e;
	} finally {
		pg.release();
	}
};

seed().catch(e => {
	setImmediate(() => {
		throw e;
	});
});
