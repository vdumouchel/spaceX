const authenticate = require('../authenticate');

module.exports = {
	Query: {
		async specificUserById(parent, input, { app, req, postgres }, info) {
			authenticate(app, req);
			let userId = input.user_id;
			const specificUserPsql = {
				text: 'SELECT * FROM bazaar.users WHERE user_id = $1',
				values: [userId],
			};
			const specificUser = await postgres.query(specificUserPsql);
			console.log('This is allUsers from listAllUsers: ', specificUser.rows);
			if (specificUser.rows.length < 1) {
				throw 'Unfortunately, there are no users yet in Bazaar.';
			}
			return specificUser.rows[0];
		},

		async searchUsers(parent, input, { app, req, postgres }, info) {
			authenticate(app, req);

			let userFirstName = input.user_first_name;
			let userLastName = input.user_last_name;
			let userUsername = input.user_username;
			let userEmail = input.user_email;
			let userRating = input.user_rating;

			const searchUserPsql = {
				text:
					'SELECT * FROM bazaar.users WHERE user_first_name = $1 OR user_last_name = $2 OR user_username = $3 OR user_email = $4 OR user_rating = $5',
				values: [userFirstName, userLastName, userUsername, userEmail, userRating],
			};
			const searchUser = await postgres.query(searchUserPsql);
			console.log('this is the specificUser.rows: ', searchUser.rows);

			if (specificUser.rows.length < 1) {
				throw 'This specific user does not exist in Bazaar.';
			}
			return searchUser.rows;
		},

		async listAllUsers(parent, _, { app, req, postgres }, info) {
			const allUsersPsql = {
				text: 'SELECT * FROM bazaar.users',
			};
			const allUsers = await postgres.query(allUsersPsql);
			console.log('This is allUsers from listAllUsers: ', allUsers.rows);
			if (allUsers.rows.length < 1) {
				throw 'Unfortunately, there are no users yet in Bazaar.';
			}
			return allUsers.rows;
		},

		async userAverageRatingByUserId(parent, input, { app, req, postgres }, info) {
			authenticate(app, req);
			let userId = input.user_id;
			const allUserRatingsPsql = {
				text:
					"Select to_char(AVG(user_rating_rating), '9D9') AS average_rating FROM Bazaar.user_ratings WHERE user_rating_rated_id = $1",
				values: [userId],
			};
			const allUserRatingsDBQuery = await postgres.query(allUserRatingsPsql);
			console.log('This is allUserRatingsfromDBQuery: ', allUserRatingsDBQuery);
			let ratingsArray = allUserRatingsDBQuery.rows[0].average_rating;
			console.log('This is ratingsArray: ', ratingsArray);

			return {
				message: `This ${userId} returns a global user rating of: ${ratingsArray}`,
				user_rating: ratingsArray,
			};
		},

		async totalUsers(parent, { user_account_deleted = false }, { app, req, postgres }, info) {
			authenticate(app, req);

			const totalUsersPsql = {
				text: 'SELECT COUNT(user_id) FROM bazaar.users WHERE user_account_deleted = $1',
				values: [user_account_deleted],
			};

			console.log(totalUsersPsql);

			const totalUsersDBQuery = await postgres.query(totalUsersPsql);
			console.log('This is the total number of users from totalUsersDBQuery: ', totalUsersDBQuery);
			let totalUsers = totalUsersDBQuery.rows[0].count;
			console.log('This is totalUsers: ', totalUsers);

			return totalUsers;
		},

		///// ITEMS

		async listAllAvailableItems(parent, _, { app, req, postgres }, info) {
			const user_id = authenticate(app, req);
			if (user_id === null || user_id === false) {
				throw 'There is no user logged in';
			} else {
			}
			const allItemsPsql = {
				text: 'SELECT * from bazaar.items',
			};

			const allItems = await postgres.query(allItemsPsql);
			console.log(allItems.rows[0]);
			if (allItems.rows.length < 1) {
				throw 'No items in Bazaar at the moment.';
			}
			return allItems.rows;
		},

		async searchItems(parent, input, { app, req, postgres }, info) {
			authenticate(app, req);

			let userId = input.user_id;
			let itemName = input.item_name;
			let itemType = input.item_type;
			let itemPrice = input.item_price;
			let itemQuantityAvail = input.item_quantity_avail;
			let itemCondition = input.item_condition;
			let itemSoldQuantity = input.item_quantity_sold;

			const specificItemPsql = {
				text:
					'SELECT * from bazaar.items WHERE item_owner_id != $1 AND item_name = $2 OR item_type = $3 OR item_price = $4 OR item_quantity_avail = $5 OR item_condition = $6 OR item_quantity_sold = $7;',
				values: [userId, itemName, itemType, itemPrice, itemQuantityAvail, itemCondition, itemSoldQuantity],
			};

			const allItems = await postgres.query(specificItemPsql);

			if (allItems.rows.length < 1) {
				throw 'Unfortunately, there is no items meeting your criteria.';
			}
			return allItems.rows;
		},

		async listItemsByUser(parent, input, { app, req, postgres }, info) {
			authenticate(app, req);
			let userId = input.user_id;
			const itemsByIdPsql = {
				text: 'SELECT * from bazaar.items WHERE item_owner_id = $1 ',
				values: [userId],
			};

			const allItems = await postgres.query(itemsByIdPsql);
			console.log('This the listItemsByUser: ', allItems.rows);
			if (allItems.rows.length < 1) {
				throw "Unfortunately, you don't have items in Bazaar at the moment.";
			}
			return allItems.rows;
		},

		async specificItemById(parent, input, { app, req, postgres }, info) {
			authenticate(app, req);
			let itemId = input.item_id;
			const specificItemPsql = {
				text: 'SELECT * FROM bazaar.items WHERE item_id = $1',
				values: [itemId],
			};
			const specificItem = await postgres.query(specificItemPsql);
			console.log('This is allUsers from listAllUsers: ', specificItem.rows);
			if (specificItem.rows.length < 1) {
				throw 'Unfortunately, there are no users yet in Bazaar.';
			}
			return specificItem.rows[0];
		},

		async itemAverageRatingbyItemID(parent, input, { app, req, postgres }, info) {
			authenticate(app, req);
			let itemId = input.item_id;
			const allItemRatingsPsql = {
				text:
					"Select to_char(AVG(item_rating_rating), '9D9') AS average_rating FROM Bazaar.item_ratings WHERE item_rating_itemrated_id = $1",
				values: [itemId],
			};
			const allItemRatingsDBQuery = await postgres.query(allItemRatingsPsql);
			console.log('This is allItemRatingsfromDBQuery: ', allItemRatingsDBQuery);
			let globalItemRating = allItemRatingsDBQuery.rows[0].average_rating;
			console.log('This is ratingsArray: ', globalItemRating);

			const itemRatingsCountPsql = {
				text: 'Select COUNT(item_rating_rating) FROM Bazaar.item_ratings WHERE item_rating_itemrated_id = $1',
				values: [itemId],
			};
			const itemRatingsCountDBQuery = await postgres.query(itemRatingsCountPsql);
			console.log('This is itemRatingsCountDBQuery: ', itemRatingsCountDBQuery);
			let itemRatingsCount = itemRatingsCountDBQuery.rows[0].count;
			console.log('This is itemRatingsCount: ', itemRatingsCount);

			return {
				message: `This ${itemId} returns a global item rating of: ${globalItemRating} and a total rating count of ${itemRatingsCount}`,
				item_rating: globalItemRating,
				item_rating_num: itemRatingsCount,
			};
		},

		async totalAvailableItems(parent, _, { app, req, postgres }, info) {
			authenticate(app, req);

			const totalAvailableItemsPsql = {
				text: 'SELECT COUNT(item_id) FROM bazaar.items',
			};

			console.log(totalAvailableItemsPsql);

			const totalAvailableItemsDBQuery = await postgres.query(totalAvailableItemsPsql);
			console.log(
				'This is the total number of items from totalAvailableItemsDBQuery: ',
				totalAvailableItemsDBQuery
			);
			let totalAvailableItems = totalAvailableItemsDBQuery.rows[0].count;
			console.log('This is totalAvailableItems: ', totalAvailableItems);

			return totalAvailableItems;
		},

		async totalSoldItems(parent, _, { app, req, postgres }, info) {
			authenticate(app, req);

			const totalSoldItemsPsql = {
				text: 'SELECT COUNT(transaction_id) FROM bazaar.transactions',
			};

			console.log(totalSoldItemsPsql);

			const totalSoldItemsDBQuery = await postgres.query(totalSoldItemsPsql);
			console.log('This is the total number of items from totalSoldItemsDBQuery: ', totalSoldItemsDBQuery);
			let totalSoldItems = totalSoldItemsDBQuery.rows[0].count;
			console.log('This is totalAvailableItems: ', totalSoldItems);

			return totalSoldItems;
		},
	},
};
