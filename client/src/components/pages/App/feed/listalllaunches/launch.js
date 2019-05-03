// basic react import
import React, { Component } from 'react';

// advanced module imports

// style & css imports
import 'antd/dist/antd.less';
import '../../../../../css/style';
import '../../../../../css/views/feed.less';
import '../../../../../css/views/launch.less';
import { Card, Icon, Avatar, Button, Modal, Checkbox, Skeleton, Spin } from 'antd';
// component imports

import BookLaunch from '../../booklaunch/booklaunch';
// declaring variables
const { Meta } = Card;

// react component

class Item extends Component {
	constructor(props) {
		super(props);
		console.log('this is ItemProps history: ', props.history);
		console.log(this.props.data.launch_site.site_name_long);
	}

	state = { visible: false, loading: true };

	showModal = e => {
		this.setState({
			visible: true,
		});
	};

	handleOk = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	handleCancel = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	render() {
		let d = new Date(this.props.data.launch_date_local);
		let date = d.toDateString();
		// const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
		console.log(date);
		return (
			<div>
				<Card
					style={{ width: 500 }}
					actions={[
						<Icon type="like" />,
						<Icon type="star" />,
						<Button onClick={this.showModal} style={{ border: '1.5px solid #f77759' }}>
							<Icon type="rocket" />
							Book it!
						</Button>,
					]}
					className="feedItemCard"
					hoverable={true}
					bordered={true}
				>
					<Avatar className="itemCardAvatar" src={this.props.data.links.mission_patch} shape="square" />
					<div>
						<Meta
							cover={
								<img className="itemImage" alt="example" src={this.props.data.links.mission_patch} />
							}
							// avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							title={<h4 style={{ textAlign: 'right' }}>{date}</h4>}
							description={
								<div>
									<span className="price" style={{ fontFamily: 'bold' }}>
										{this.props.data.mission_name}
									</span>
									<br />
									<br />
									<span>{this.props.data.rocket.rocket_type}</span>
								</div>
							}
							className="itemCardMeta"
						/>
						<span style={{ color: 'rgba(16, 11, 10, 0.45)' }}>
							{this.props.data.launch_site.site_name_long}
						</span>
						<Modal
							title={this.props.data.item_name}
							visible={this.state.visible}
							onOk={this.handleOk}
							onCancel={this.handleCancel}
							footer={[
								<div>
									<Button key="back" onClick={this.handleCancel}>
										Cancel
									</Button>
									<BookLaunch {...this.props} />
								</div>,
							]}
						>
							<Meta
								description={
									<div>
										<img
											className="buyItemImage"
											alt="example"
											src={this.props.data.links.mission_patch}
											style={{ marginRight: 15, marginBottom: 15, float: 'left' }}
										/>
										<div style={{ float: 'left' }}>
											<span className="price">{this.props.data.mission_name}</span>
											<br />
											<span>
												{this.props.data.rocket.rocket_type} - Flight Number{' '}
												{this.props.data.flight_number}
											</span>
											<br />
											<br />
										</div>
										<div style={{ float: 'right' }}>
											<span
												style={{
													float: 'right',
													fontSize: 15.2,
													fontFamily: 'bold',
													color: '#cb6249',
												}}
											>
												{date}
											</span>
											<br />
											<span>{this.props.data.launch_site.site_name_long}</span>
											<br />
											<br />
											<br />
										</div>
										<div style={{ float: 'right' }}>
											<Checkbox>
												I understand space&#60;X&#62;plorers <a>Refunding Policy</a>
											</Checkbox>
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
