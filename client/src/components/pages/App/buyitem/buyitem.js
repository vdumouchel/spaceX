import React from 'react';
import { Mutation } from 'react-apollo';

// css & styles imports
import 'antd/dist/antd.less';
import '../../../../css/style';
import '../../../../css/views/additem.less';
// components imports
import { buyItemMutation } from '../../../gql-mutations/gql-mutations';
import { Button } from 'antd';
import { withRouter } from 'react-router';
// declaring variables

// declaring the exported function

const BuyItem = props => {
	console.log('this is buy item props history :', props);
	let itemId = props.data.item_id;
	console.log('this is itemId props; ', props.data.item_id);

	return (
		<Mutation
			mutation={buyItemMutation}
			onError={error => {
				console.log(error);

				alert('Sorry, buying the item did not work. Please try again. ');
			}}
			onCompleted={data => {
				console.log(data);
				console.log(data.buyItem);
				data.buyItem.message === `Amazing! You just bought this Bazaar item!`
					? props.history.push('/app')
					: alert(`Buying the item failed.`);
			}}
		>
			{(buyItem, { data }) => {
				return (
					<div>
						<Button
							onClick={() => {
								console.log(itemId);
								buyItem({
									variables: {
										item_id: itemId,
									},
								});
							}}
						>
							Buy Now!
						</Button>
					</div>
				);
			}}
		</Mutation>
	);
};

export default withRouter(BuyItem);
