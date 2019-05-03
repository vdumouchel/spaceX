import React from 'react';
import { Mutation } from 'react-apollo';

// css & styles imports
import 'antd/dist/antd.less';
import '../../../../css/style';
import '../../../../css/views/additem.less';
// components imports
import { bookLaunchMutation } from '../../../gql-mutations/gql-mutations';
import { Button } from 'antd';
import { withRouter } from 'react-router';
// declaring variables

// declaring the exported function

const BookLaunch = props => {
	// console.log('this is Booklaunch props history :', props.history);
	let launchId = props.data.flight_number;
	// console.log('this is flightNumber props; ', props.data.flight_number);

	return (
		<Mutation
			mutation={bookLaunchMutation}
			onError={error => {
				console.log(error);

				alert('Sorry, booking this trip did not work. Please try again. ');
			}}
			onCompleted={data => {
				// console.log(data);
				console.log(data.bookLaunch);
				data.bookLaunch.message === `You sucessfully booked a Launch! Have a good Trip!`
					? props.history.push('/app')
					: alert(`Sorry. The booking didn't work.`);
			}}
		>
			{(bookLaunch, { data }) => {
				return (
					<Button
						onClick={() => {
							console.log(launchId);
							bookLaunch({
								variables: {
									flight_number: launchId,
								},
							});
						}}
						className="bookNow"
					>
						Book Now!
					</Button>
				);
			}}
		</Mutation>
	);
};

export default withRouter(BookLaunch);
