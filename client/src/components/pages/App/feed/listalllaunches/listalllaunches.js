// basic react import
import React from 'react';

// advanced module imports
import { Query } from 'react-apollo';
// style & css imports
import 'antd/dist/antd.less';
import '../../../../../css/style';
import '../../../../../css/views/feed.less';
import Launch from './launch';
import CardSkeleton from '../sider/cardskeleton';
import { Divider } from 'antd';

// component imports
import { listAllLaunches } from '../../../../gql-queries/gql-queries';
// declaring variables

// react component

const ListAllLaunches = props => {
	// console.log('this is listAllLaunches history: ', props.history);
	return (
		<Query query={listAllLaunches}>
			{({ loading, errors, data }) => {
				if (loading)
					return (
						<div>
							<CardSkeleton />
						</div>
					);
				if (errors) return <div>Errors {JSON.stringify(errors)}</div>;
				return (
					<div>
						<div style={{ padding: '0 10px' }}>
							<h1>Available Launches</h1>
							<Divider />
						</div>
						<div>
							{data.listAllLaunches.map(item => (
								<Launch key={item.flight_number} data={item} {...props} />
							))}
						</div>
					</div>
				);
			}}
		</Query>
	);
};

export default ListAllLaunches;
