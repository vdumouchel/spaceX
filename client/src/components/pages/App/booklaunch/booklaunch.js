import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

// css & styles imports
import 'antd/dist/antd.less';
import '../../../../css/style';
import '../../../../css/views/additem.less';
// components imports
import { bookLaunchMutation } from '../../../gql-mutations/gql-mutations';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router';
// declaring variables

// declaring the exported function

class BookLaunch extends Component {
	constructor(props) {
		super(props);
	}
	// console.log('this is Booklaunch props history :', props.history);
	// console.log('this is flightNumber props; ', props.data.flight_number);
	openNotificationWithIcon = type => {
		notification[type]({
			message: `Amazing! You just booked a launch for mission ${this.props.data.mission_name}! `,
			description: 'To view your newly booked launch undesr Tools, refresh the page!',
			duration: 2.5,
		});
	};
	render() {
		let launchId = this.props.data.flight_number;
		return (
			<Mutation
				mutation={bookLaunchMutation}
				onError={error => {
					console.log(error);

					alert('Sorry, booking this trip did not work. Please try again. ');
				}}
				onCompleted={data => {
					// console.log(data);
					console.log(this.props.data.bookLaunch);
					data.bookLaunch.message === `You sucessfully booked a Launch! Have a good Trip!`
						? this.props.history.push('/app')
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
								this.openNotificationWithIcon('success');
								this.props.handleOk();
							}}
							className="bookNow"
						>
							Book Now!
						</Button>
					);
				}}
			</Mutation>
		);
	}
}

export default withRouter(BookLaunch);
