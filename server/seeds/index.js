const { Pool } = require('pg');
const squel = require('squel').useFlavour('postgres');
const config = require('../config/default.json');

const userSeeds = [
	{
		user_first_name: 'Simon',
		user_last_name: 'Stern',
		user_username: 'simistern',
		user_email: 'simon@simon.stern',
		user_password: '$2b$12$keWnhcUZrDCqFNL66SBQCeKKuAsn8xtS0H5qQAGJmFkk4jft0/1iy',

		user_date_joined: '2017-08-15 21:05:15.723336-04',
		user_account_deleted: false,
		user_rating: 4.9,
	},
	{
		user_first_name: 'Akshay',
		user_last_name: 'Manchanda',
		user_username: 'IronA',
		user_email: 'akshay@akshay.com',
		user_password: '$2b$12$Icmv1X6pKuV5CS8b5uisgOfhfmggUO94y4LbMumV9Oj1H8NXNRvMa',
		user_date_joined: '2019-03-02 17:33:12.723336-04',
		user_account_deleted: false,
		user_rating: 4.4,
	},
];

const itemSeeds = [
	{
		item_name: 'Amazing wood effect stand up paddle board!',
		item_type: 'Water Sports',
		item_status: 'available',
		item_price: 1000.15,
		item_quantity_avail: 3,
		item_description:
			"Ready to tackle just about anything, from flatwater to fitness to surfing and even SUP yoga. This Taiga's stable design suits beginners on calm water or paddlers venturing into surfier conditions. It tracks superbly, letting you develop skills and efficient strokes on either side. <br /> Clear coat finish uses tri-layer fibreglass epoxy resin. Lightweight EPS foam core with 5-layer reinforced sidewalls. Deck pad makes touring days more comfortable.",
		item_thumbnail_url:
			'https://cdn.shopify.com/s/files/1/1107/3616/products/board_with_grip_1024x1024.jpg?v=1475640742',
		item_condition: 'near mint',
		item_owner_id: 1,
		item_date_created: '2019-04-14 17:33:12.723336-04',
		item_quantity_sold: 1,
		item_rating: 4.9,
		item_rating_num: 1,
	},
	{
		item_name: '"No-Thrill" Nissan Versa 2007 166,000 KM',
		item_type: 'Cars',
		item_status: 'available',
		item_price: 1800.0,
		item_quantity_avail: 1,
		item_description:
			'Want a great running car that is practically theft proof? Meet No-Thrill. Trunk does not open. Gas door is stuck open. You will make a lot of friends as everyone honks and gestures to let you know the gas door is open. Several panels are different shades of black. Some matte, some shiny. Call it abstract art. Shakes like it has withdrawal symptoms if you drive over 65 Km/h. Best offer only, accepting 24k gold as well. Holla for a grand tour with it.',
		item_thumbnail_url: 'http://www.blogcdn.com/green.autoblog.com/media/2007/09/nissan-versa-review-post-4505.jpg',
		item_condition: 'salvageable',
		item_owner_id: 1,
		item_date_created: '2019-04-03 17:33:12.723336-04',
		item_quantity_sold: 0,
		item_rating: null,
		item_rating_num: null,
	},
];

const transactionSeeds = [
	{
		transaction_item_id: 1,
		transaction_item_name: 'Amazing wood effect stand up paddle board!',
		transaction_item_type: 'Water Sports',
		transaction_item_status: 'not available for sale',
		transaction_item_price: 1000.15,
		transaction_item_thumbnail_url:
			'https://cdn.shopify.com/s/files/1/1107/3616/products/board_with_grip_1024x1024.jpg?v=1475640742',
		transaction_item_condition: 'near mint',
		transaction_item_buyer_id: 2,
		transaction_item_seller_id: 1,
		transaction_date: '2019-04-14 17:33:12.723336-04',
	},
];

const userRatingSeeds = [
	{
		user_rating_rater_id: 2,
		user_rating_rated_id: 1,
		user_rating_rating: 4.8,
		user_rating_comment: 'Simon is really the King of App Dev.',
		user_rating_date: '2019-04-14 17:33:12.723336-04',
	},
];

const itemRatingSeeds = [
	{
		item_rating_itemrated_id: 1,
		item_rating_rater_id: 2,
		item_rating_rating: 4.9,
		item_rating_comment: 'This is a spectacular Paddle Board. Really cool woodwork. Would highly recommend.',
		item_rating_date: '2019-04-14 17:33:12.723336-04',
	},
];

const seed = async () => {
	const pg = await new Pool(config.db).connect();

	try {
		await pg.query('BEGIN');

		console.log('Seeding Users, Items, Transactions, userRatings and itemRatings...');

		await Promise.all(
			userSeeds.map(userSeed =>
				pg.query(
					squel
						.insert()
						.into('bazaar.users')
						.setFields(userSeed)
						.toParam()
				)
			)
		);

		await Promise.all(
			itemSeeds.map(itemSeed =>
				pg.query(
					squel
						.insert()
						.into('bazaar.items')
						.setFields(itemSeed)
						.toParam()
				)
			)
		);

		await Promise.all(
			transactionSeeds.map(transactionSeed =>
				pg.query(
					squel
						.insert()
						.into('bazaar.transactions')
						.setFields(transactionSeed)
						.toParam()
				)
			)
		);

		await Promise.all(
			userRatingSeeds.map(userRatingSeed =>
				pg.query(
					squel
						.insert()
						.into('bazaar.user_ratings')
						.setFields(userRatingSeed)
						.toParam()
				)
			)
		);

		await Promise.all(
			itemRatingSeeds.map(itemRatingSeed =>
				pg.query(
					squel
						.insert()
						.into('bazaar.item_ratings')
						.setFields(itemRatingSeed)
						.toParam()
				)
			)
		);

		/* TODO more seeds, one for each table you need to seed */
		console.log('Seeding Users, Items, Transactions, userRatings and itemRatings... [DONE]');
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
