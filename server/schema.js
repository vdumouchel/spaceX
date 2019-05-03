const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar Date

	type User {
		user_id: ID!
		user_fullname: String
		user_username: String
		user_email: String
		user_password: String
		user_date_joined: Date
	}
	type Launch {
		flight_number: ID!
		rocket: Rocket
		mission_name: String
		links: Mission
		launch_year: String
		launch_date_local: String
		launch_site: LaunchSite
	}

	type Rocket {
		rocket_id: ID!
		rocket_type: String
	}

	type Mission {
		mission_patch(size: PatchSize): String
	}
	enum PatchSize {
		SMALL
		LARGE
	}

	type LaunchSite {
		site_name_long: String
	}

	type Query {
		specificUserById: User
		listAllLaunches: [Launch]
		listMyLaunches: [Launch]
		oneLaunchView(flight_number: ID): Launch
	}

	type Mutation {
		signUp(input: SignUpObject!): SignUpResponse
		login(input: LoginObject!): LoginResponse
		bookLaunch(flight_number: ID): bookLaunchResponse
	}

	type SignUpResponse {
		message: String
	}

	input SignUpObject {
		user_fullname: String!
		user_username: String!
		user_email: String!
		user_password: String!
	}

	type LoginResponse {
		message: String
	}

	input LoginObject {
		user_email: String!
		user_password: String!
	}

	type bookLaunchResponse {
		message: String
		launchBooked: Launch
	}
`;
