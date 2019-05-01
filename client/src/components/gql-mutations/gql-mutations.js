import gql from 'graphql-tag';

export const signUpMutation = gql`
	mutation signUpMutation(
		$user_first_name: String!
		$user_last_name: String!
		$user_username: String!
		$user_email: String!
		$user_password: String!
	) {
		signUp(
			user_first_name: $user_first_name
			user_last_name: $user_last_name
			user_username: $user_username
			user_email: $user_email
			user_password: $user_password
		) {
			message
		}
	}
`;

export const LogInMutation = gql`
	mutation LogInMutation($user_email: String!, $user_password: String!) {
		login(user_email: $user_email, user_password: $user_password) {
			message
		}
	}
`;

export const LogoutMutation = gql`
	mutation LogoutMutation {
		logout {
			message
		}
	}
`;

export const addItemMutation = gql`
	mutation addItemMutation(
		$item_name: String!
		$item_type: String!
		$item_price: Float!
		$item_quantity_avail: Int!
		$item_description: String
		$item_condition: String
	) {
		addItem(
			item_name: $item_name
			item_type: $item_type
			item_price: $item_price
			item_quantity_avail: $item_quantity_avail
			item_description: $item_description
			item_condition: $item_condition
		) {
			message
		}
	}
`;

export const buyItemMutation = gql`
	mutation buyItemMutation($item_id: ID!) {
		buyItem(item_name: $item_id) {
			message
			item
			transaction
		}
	}
`;
