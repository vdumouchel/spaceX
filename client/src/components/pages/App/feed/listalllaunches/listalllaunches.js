// basic react import
import React from 'react';

// advanced module imports
import { Query } from 'react-apollo';
// style & css imports
import 'antd/dist/antd.less';
import '../../../../../css/style';
import '../../../../../css/views/feed.less';
import Launch from './launch';

// component imports
import { listAllLaunches } from '../../../../gql-queries/gql-queries';
// declaring variables

// react component

const ListAllLaunches = props => {
	console.log('this is listAllLaunches history: ', props.history);
	return (
		<Query query={listAllLaunches}>
			{({ loading, errors, data }) => {
				if (loading) return <div>Loading...</div>;
				if (errors) return <div>Errors {JSON.stringify(errors)}</div>;
				return (
					<div>
						{data.listAllLaunches.map(item => (
							<Launch key={item.flight_number} data={item} {...props} />
						))}
					</div>
				);
			}}
		</Query>
	);
};

export default ListAllLaunches;
