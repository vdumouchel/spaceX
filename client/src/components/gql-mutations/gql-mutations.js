import gql from 'graphql-tag';

export const signUpMutation = gql`
	mutation signUpMutation($input: SignUpObject!) {
		signUp(input: $input) {
			message
		}
	}
`;

export const LogInMutation = gql`
	mutation LogInMutation($input: LoginObject!) {
		login(input: $input) {
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

export const buyItemMutation = gql`
	mutation buyItemMutation($item_id: ID!) {
		buyItem(item_name: $item_id) {
			message
			item
			transaction
		}
	}
`;
