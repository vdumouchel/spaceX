// basic react import
import React from 'react';

// advanced module imports
import { Query } from 'react-apollo';
// style & css imports
import 'antd/dist/antd.less';
import '../../../../../css/style';
import '../../../../../css/views/feed.less';
import MyLaunches from './mylaunches';
import CardSkeleton from './cardskeleton';
import { Carousel } from 'antd';

// component imports
import { listMyLaunches } from '../../../../gql-queries/gql-queries';
// declaring variables

// react component

const ListMyLaunches = props => {
	// console.log('this is listAllLaunches history: ', props.history);

	return (
		<Query query={listMyLaunches}>
			{({ loading, errors, data }) => {
				if (loading)
					return (
						<div>
							<CardSkeleton />
						</div>
					);
				if (errors) return <div>Errors {JSON.stringify(errors)}</div>;
				return (
					<Carousel>
						<div>
							{data.listMyLaunches.map(item => (
								<MyLaunches key={item.flight_number} data={item} {...props} />
							))}
						</div>
					</Carousel>
				);
			}}
		</Query>
	);
};

export default ListMyLaunches;
