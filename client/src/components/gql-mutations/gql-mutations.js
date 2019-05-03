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

export const bookLaunchMutation = gql`
	mutation bookLaunchMutation($flight_number: ID) {
		bookLaunch(flight_number: $flight_number) {
			message
			launchBooked {
				flight_number
				rocket {
					rocket_id
					rocket_type
				}
				mission_name
				links {
					mission_patch
				}
				launch_site {
					site_name_long
				}
				launch_year
				launch_date_local
			}
		}
	}
`;
