import gql from 'graphql-tag';

export const listAllAvailableItems = gql`
	query {
		listAllAvailableItems {
			item_id
			item_name
			item_price
			item_description
			item_thumbnail_url
			item_type
			item_status
			item_rating
			item_quantity_avail
			item_owner_id
		}
	}
`;
