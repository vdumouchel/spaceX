const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar Date

	type User {
		user_id: ID!
		user_first_name: String
		user_last_name: String
		user_username: String
		user_email: String
		user_password: String
		user_date_joined: Date
		user_account_deleted: Boolean
		user_rating: Float
	}

	type user_rating {
		user_rating_id: ID!
		user_rating_rater_id(user_id: ID): ID!
		user_rating_rated_id(user_id: ID): ID!
		user_rating_rating: Float
		user_rating_comment: String
		user_rating_date: Date
	}

	type Item {
		item_id: ID!
		item_name: String
		item_type: String
		item_status: String
		item_price: Float
		item_quantity_avail: Int
		item_description: String
		item_thumbnail_url: String
		item_condition: String
		item_owner_id(user_id: ID): ID!
		item_date_created: Date
		item_quantity_sold: Int
		item_rating: Float
		item_rating_num: Int
	}
	type item_rating {
		item_rating_id: ID!
		item_rating_itemrated_id: Int
		item_rating_rater_id: Int
		item_rating_rating: Float
		item_rating_comment: String
		item_rating_date: Date
	}

	type Transaction {
		transaction_id: ID!
		transaction_item_id: Int
		transaction_item_name: String
		transaction_item_type: String
		transaction_item_status: String
		transaction_item_price: Float
		transaction_item_thumbnail_url: String
		transaction_item_condition: String
		transaction_item_buyer_id(user_id: ID): ID!
		transaction_item_seller_id(user_id: ID): ID!
		transaction_date: Date
		transaction_stripe_id: String
	}

	type Query {
		specificUserById(user_id: ID): User
		searchUsers(
			user_first_name: String
			user_last_name: String
			user_username: String
			user_email: String
			user_rating: Float
		): [User]
		listAllUsers: [User]!
		listItemsByUser(user_id: ID): [Item]!
		userAverageRatingByUserId(user_id: ID): User
		totalUsers(user_account_deleted: Boolean): Int
		listAllAvailableItems: [Item]!
		searchItems(
			user_id: ID
			item_name: String
			item_type: String
			item_price: Float
			item_quantity_avail: Int
			item_condition: String
			item_quantity_sold: Int
		): [Item]
		specificItemById(item_id: ID): Item
		itemAverageRatingbyItemID(item_id: ID): Item
		totalAvailableItems: Int
		totalSoldItems: Int
	}

	type Mutation {
		signUp(
			user_first_name: String!
			user_last_name: String!
			user_username: String!
			user_email: String!
			user_password: String!
		): SignUpResponse
		login(user_email: String!, user_password: String!): LoginResponse
		logout: logoutResponse
		addItem(
			user_id: ID
			item_name: String!
			item_type: String!
			item_status: String
			item_price: Float!
			item_quantity_avail: Int!
			item_description: String
			item_thumbnail_url: String
			item_condition: String
		): addItemResponse
		removeItem(user_id: ID, item_id: ID!): removeItemResponse
		buyItem(user_id: ID, item_id: ID!): buyItemResponse
		updateUser(
			user_id: ID!
			user_first_name: String
			user_last_name: String
			user_username: String
			user_email: String
			user_password: String
			user_status: String
		): updateUserResponse
		updateItem(
			# user_id: ID!
			item_id: ID!
			item_name: String
			item_type: String
			item_status: String
			item_price: Float
			item_quantity_avail: Int
			item_description: String
			item_thumbnail_url: String
			item_condition: String
		): updateItemResponse
		addUserRating(
			user_rating_rater_id: ID!
			user_rating_rated_id: ID!
			user_rating_rating: Float
			user_rating_comment: String
		): addUserRatingResponse
	}

	type SignUpResponse {
		message: String
	}

	type LoginResponse {
		token: String!
		message: String
	}

	type addItemResponse {
		message: String
		item: Item
	}

	type removeItemResponse {
		message: String
		item: Item
	}

	type buyItemResponse {
		message: String
		item: Item
		transaction: Transaction
	}

	type updateUserResponse {
		message: String
		updatedUser: [User]
	}
	type updateItemResponse {
		message: String
		updatedItem: [Item]
	}

	type addUserRatingResponse {
		message: String
		user_rating: user_rating
	}

	type logoutResponse {
		message: String
	}
`;
