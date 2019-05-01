import React from 'react';
import { Mutation } from 'react-apollo';

// css & styles imports
import 'antd/dist/antd.less';
import '../../../../css/style';
import '../../../../css/views/additem.less';
// components imports
import { buyItemMutation } from '../../../gql-mutations/gql-mutations';
import { Button } from 'antd';

// declaring variables

// declaring the exported function

const buyItem = ({ match, history }) => {
	let itemId = this.props.data.item_id;

	return (
		<Mutation
			mutation={buyItemMutation}
			variables={itemId}
			onError={error => {
				console.log(error);

				alert('Sorry, buying the item did not work. Please try again. ');
			}}
			onCompleted={data => {
				console.log(data);
				console.log(data.buyItem);
				// data.buyItem.message === `Amazing! You just bought this Bazaar item!`
				// 	? history.push('/app')
				// 	: alert(`Buying the item failed.`);
			}}
		>
			{(buyItem, { data }) => (
				<div>
					<form
						onSubmit={e => {
							e.preventDefault();
							buyItem({ variables: { itemId } });
						}}
					>
						<Button type="submit">Buy Now!</Button>
					</form>
				</div>
			)}
		</Mutation>
	);
};

export default buyItem;
