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

module.exports = {
	Mutation: {
		async signUp(parent, input, { req, app, postgres }) {
			try {
				let signUpEmail = input.user_email.toLowerCase();
				let hashedSignUpPassword = await bcrypt.hash(input.user_password, saltRounds);

				const newUserInsert = {
					text:
						' INSERT INTO bazaar.users (user_first_name, user_last_name, user_username, user_email, user_password,user_account_deleted) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
					values: [
						input.user_first_name,
						input.user_last_name,
						input.user_username,
						signUpEmail,
						hashedSignUpPassword,
						false,
					],
				};
				let insertNewUserResult = await postgres.query(newUserInsert);

				let myjwttoken = await jwt.sign(
					{
						data: insertNewUserResult.rows[0].user_id,
						exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
					},
					'secret'
				);

				req.res.cookie('bazaar_app', myjwttoken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
				});

				if (insertNewUserResult) {
					signUpMessage = `Amazing! Welcome to Bazaar!`;
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

		async login(parent, input, { req, app, postgres }) {
			try {
				let loginEmail = input.user_email.toLowerCase();

				let loginPassword = input.user_password;

				const emailFromUser = {
					text: 'SELECT user_id, user_password FROM bazaar.users WHERE user_email = $1',
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

					req.res.cookie('bazaar_app', myjwttoken, {
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

		async logout(parent, input, { req, app, postgres }) {
			try {
				req.clearCookie('bazaar_app');

				logoutMessage = 'You successfully logged out!';
				console.log(req.cookies);
				return {
					message: logoutMessage,
				};
			} catch (e) {
				console.error('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},

		async addItem(parent, input, { req, app, postgres }) {
			try {
				console.log('Showing addItem input', input);
				let userId = authenticate(app, req);
				// let userId = input.user_id;
				console.log('this is userId from authenticate(): ', userId);
				let itemName = input.item_name;
				let itemType = input.item_type;
				let itemPrice = input.item_price;
				let itemQuantityAvail = input.item_quantity_avail;
				let itemDescription = input.item_description;
				let itemThumbnail = input.item_thumbnail_url;
				let itemCondition = input.item_condition;

				// psql command
				const addItemInsert = {
					text:
						' INSERT INTO bazaar.items (item_name, item_type, item_status, item_price, item_quantity_avail, item_description, item_thumbnail_url, item_condition, item_owner_id, item_quantity_sold) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
					values: [
						itemName,
						itemType,
						'available',
						itemPrice,
						itemQuantityAvail,
						itemDescription,
						itemThumbnail,
						itemCondition,
						1,
						0,
					],
				};

				//query to change DB
				let addItemInsertResult = await postgres.query(addItemInsert);
				// console.log(addItemInsertResult);

				console.log('This Item result was added to the DB: ', addItemInsertResult.rows[0].item_name);
				let item = addItemInsertResult.rows[0];

				return {
					message: `Item was sucessfully added to the Bazaar Database.`,
					item: item,
				};
			} catch (e) {
				console.error('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},

		async removeItem(parent, input, { req, app, postgres }) {
			console.log('Showing removeItem input', input);
			try {
				let itemId = input.item_id;
				let userId = input.user_id;

				// psql command
				const removeItemDB = {
					text: 'DELETE FROM bazaar.items WHERE item_id = $1 AND item_owner_id = $2',
					values: [itemId, userId],
				};

				//query to change DB
				let removeItemDBQuery = await postgres.query(removeItemDB);

				console.log('This Item was removed from the DB: ', removeItemDBQuery);
				let item = removeItemDBQuery.rows[0];
				return {
					message: `Item was sucessfully removed from the Bazaar Database.`,
					item: item,
				};
			} catch (e) {
				console.error('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},

		async buyItem(parent, input, { req, app, postgres }) {
			console.log('Showing buyItem input', input);
			try {
				//declaring Schema variables
				let message = '';
				let item = '';
				let transaction = '';

				//fetching the desired item available quantity
				let itemId = input.item_id;
				const itemByIdPsql = {
					text: 'Select * FROM bazaar.items WHERE item_id = $1',
					values: [itemId],
				};
				let itemByIdDBQuery = await postgres.query(itemByIdPsql);
				console.log('this is the item Available DB Query: ', itemByIdDBQuery);

				let itemQuantity = itemByIdDBQuery.rows[0].item_quantity_avail;
				let soldQuantity = itemByIdDBQuery.rows[0].item_quantity_sold;
				console.log(
					`This ${
						itemByIdDBQuery.rows[0].item_name
					} currently has a quantity of  ${itemQuantity} in the Bazaar DB.`
				);

				// if available quantity > 0, proceed with inventory update and transaction creation
				if (itemQuantity > 0) {
					// declaring input variables
					let itemId = input.item_id;
					// let itemBuyer = authenticate(app, req);
					let itemBuyer = 1;

					// importing a decrementing quantity function
					let itemUpdatedQuantity = await quantityAvail(itemQuantity);
					let soldUpdatedQuantity = await totalItemSold(soldQuantity);

					console.log('This is itemUpdatedQuantity from the buyItem function: ', itemUpdatedQuantity);
					console.log('This is soldItemQuantity from the buyItem function: ', soldUpdatedQuantity);

					//updating the inventory with the newest quantity available
					const updateItemPsql = {
						text:
							'UPDATE bazaar.items SET item_quantity_avail = $1, item_quantity_sold = $2  where item_id = $3 RETURNING *',
						values: [itemUpdatedQuantity, soldUpdatedQuantity, itemId],
					};
					let updateItemDBQuery = await postgres.query(updateItemPsql);
					console.log(updateItemDBQuery.rows[0]);

					// creating the transaction in transaction table
					item = updateItemDBQuery.rows[0];
					const transactionPsql = {
						text:
							'INSERT INTO bazaar.transactions (transaction_item_id, transaction_item_name, transaction_item_type, transaction_item_status, transaction_item_price, transaction_item_thumbnail_url, transaction_item_condition, transaction_item_buyer_id, transaction_item_seller_id, transaction_stripe_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
						values: [
							item.item_id,
							item.item_name,
							item.item_type,
							'not available for sale',
							item.item_price,
							item.item_thumbnail_url,
							item.item_condition,
							itemBuyer,
							item.item_owner_id,
							null,
						],
					};

					let transactionDBQuery = await postgres.query(transactionPsql);

					transaction = transactionDBQuery.rows[0];
					//declaring success messages and error messages
					message = `Amazing! You just bought this Bazaar item!`;
				} else {
					message = `Sorry. This item is currently unavailable.`;
				}

				// returning variables and scalars to Schema
				return {
					message: message,
					item: item,
					transaction: transaction,
				};
			} catch (e) {
				console.error('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},

		async updateUser(parent, input, { postgres }, info) {
			try {
				let updatedUser = '';
				console.log('This is input from updateUser: ', input);
				const updateUser = buildUpdate(input, 'user_id', 'bazaar.users', true);
				console.log('this is updateUser : ', updateUser);
				const updateUserDB = await postgres.query(updateUser);
				console.log('this is updateUserDB: ', updateUserDB);
				return {
					message: `Your User updates were sucessful. You have updated User : ${
						input.user_id
					} : with the following modifications: ${input.user_first_name} ${input.user_last_name} ${
						input.user_username
					} ${input.user_email} ${input.user_password} ${input.user_status}`,
					updatedUser: updateUserDB.rows,
				};
			} catch (e) {
				console.error('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},

		async updateItem(parent, input, { postgres }, info) {
			try {
				console.log('This is input from updateItem: ', input);
				const updateItem = buildUpdate(input, 'item_id', 'bazaar.items', true);
				console.log('this is updateItem : ', updateItem);
				const updateItemDB = await postgres.query(updateItem);
				console.log('this is updateItemDB: ', updateItemDB);
				return {
					message: `Your Item updates were sucessful. You have updated Item : ${
						input.item_id
					} : with the following modifications: ${input.item_name} ${input.item_type} ${input.item_status} ${
						input.item_price
					}${input.item_quantity_avail} ${input.item_description} ${input.item_thumbnail_url} ${
						input.item_description
					}`,
					updatedItem: updateItemDB.rows,
				};
			} catch (e) {
				console.error('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},

		async addUserRating(parent, input, { req, app, postgres }) {
			try {
				console.log("Showing addUserRating's input", input);
				let raterId = input.user_rating_rater_id;
				let ratedId = input.user_rating_rated_id;
				let rating = input.user_rating_rating;
				let ratingComment = input.user_rating_comment;

				// psql command
				const userRatingInsertPsql = {
					text:
						' INSERT INTO bazaar.user_ratings (user_rating_rater_id, user_rating_rated_id,user_rating_rating, user_rating_comment) VALUES ($1, $2, $3, $4) RETURNING *',
					values: [raterId, ratedId, rating, ratingComment],
				};

				//query to change DB
				let userRatingDBQuery = await postgres.query(userRatingInsertPsql);
				// console.log(addItemInsertResult);

				console.log('This User Rating result was added to the DB: ', userRatingDBQuery.rows[0].rating_rating);
				let User_Rating = userRatingDBQuery.rows[0];

				return {
					message: `Your User Rating was sucessfully added to the Bazaar Database.`,
					user_rating: User_Rating,
				};
			} catch (e) {
				console.error('Sorry! This returned an error of: ', e.message);
				throw e.message;
			}
		},
	},
};
