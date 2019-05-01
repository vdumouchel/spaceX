// basic react import
import React, { Component } from 'react';
import rp from 'request-promise';
// advanced module imports
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';

// style & css imports
import 'antd/dist/antd.less';
import '../../../../../css/style';
import '../../../../../css/views/feed.less';
import { Card, Icon, Avatar, Button, Modal, Checkbox } from 'antd';
// component imports
import { buyItemMutation } from '../../../../gql-mutations/gql-mutations';
import buyItem from '../../buyitem/buyitem';
// declaring variables
const { Meta } = Card;

// react component

class Item extends Component {
	num = this.props.data.item_price;
	price = this.num.toFixed(2);

	state = { visible: false };

	showModal = e => {
		this.setState({
			visible: true,
		});
	};

	// handleOk = e => {
	// 	console.log(e);
	// 	this.setState({
	// 		visible: false,
	// 	});
	// };

	handleCancel = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};
	itemId = this.props.data.item_id;

	render() {
		return (
			<div>
				<Card
					style={{ width: 500 }}
					actions={[
						<Icon type="like" />,
						<Icon type="star" />,
						<Button onClick={this.showModal}>
							<Icon type="shopping-cart" />
							Buy
						</Button>,
					]}
					className="feedItemCard"
					hoverable={true}
					bordered={true}
				>
					<Avatar className="itemCardAvatar" src={this.props.data.item_thumbnail_url} shape="square" />
					<div>
						<Meta
							cover={<img className="itemImage" alt="example" src={this.props.data.item_thumbnail_url} />}
							// avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							title={<h4>{this.props.data.item_name}</h4>}
							description={
								<div>
									<span className="price">${this.price}</span>
									<br />
									<br />
									<span> quantity left: {this.props.data.item_quantity_avail}</span>
								</div>
							}
							className="itemCardMeta"
						/>
						<Avatar
							className="itemCardMetaAvatar"
							src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
						/>
						<Modal
							title={this.props.data.item_name}
							visible={this.state.visible}
							onOk={this.handleOk}
							onCancel={this.handleCancel}
							footer={[
								<Button key="back" onClick={this.handleCancel}>
									Cancel
								</Button>,
								<buyItem />,
							]}
						>
							<Meta
								// cover={
								// 	<img className="itemImage" alt="example" src={this.props.data.item_thumbnail_url} />
								// }
								// avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
								description={
									<div>
										<img
											className="buyItemImage"
											alt="example"
											src={this.props.data.item_thumbnail_url}
											style={{ marginRight: 15, marginBottom: 15, float: 'left' }}
										/>
										<div style={{ float: 'left' }}>
											<span className="price">${this.price}</span>
											<br />
											<span> quantity left: {this.props.data.item_quantity_avail}</span>
										</div>
										<div style={{ float: 'right' }}>
											<span>{this.props.data.item_description}</span>
											<br />
											<br />
											<br />
											<div style={{ float: 'right' }}>
												<Checkbox>
													I understand Bazaar's <a>Refunding Policy</a>
												</Checkbox>
											</div>
										</div>
									</div>
								}
								className="itemCardMeta"
							/>
						</Modal>
					</div>
				</Card>
			</div>
		);
	}
}
export default Item;
