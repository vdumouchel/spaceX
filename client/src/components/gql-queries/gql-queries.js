import gql from 'graphql-tag';

export const listAllLaunches = gql`
	query {
		listAllLaunches {
			flight_number
			rocket {
				rocket_id
				rocket_type
			}
			mission_name
			links {
				mission_patch
			}
			launch_year
			launch_date_local
			launch_site {
				site_name_long
			}
		}
	}
`;
