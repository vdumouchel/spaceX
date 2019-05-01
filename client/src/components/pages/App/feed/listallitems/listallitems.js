// basic react import
import React from 'react';

// advanced module imports
import { Query } from 'react-apollo';
// style & css imports
import 'antd/dist/antd.less';
import '../../../../../css/style';
import '../../../../../css/views/feed.less';
import Item from './item';

// component imports
import { listAllAvailableItems } from '../../../../gql-queries/gql-queries';
// declaring variables

// react component

const ListAllItems = ({ match, history }) => {
	return (
		<Query query={listAllAvailableItems}>
			{({ loading, errors, data }) => {
				if (loading) return <div>Loading...</div>;
				if (errors) return <div>Errors {JSON.stringify(errors)}</div>;
				return (
					<div>
						{data.listAllAvailableItems.map(item => (
							<Item key={item.item_id} data={item} />
						))}
					</div>
				);
			}}
		</Query>
	);
};

export default ListAllItems;
