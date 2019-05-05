// basic react import
import React, { Component } from 'react';

// advanced module imports

// style & css imports
import 'antd/dist/antd.less';
import '../../../../../css/style';
import '../../../../../css/views/feed.less';
import '../../../../../css/views/launch.less';
import { Card, Avatar } from 'antd';
// component imports

// declaring variables
const { Meta } = Card;

// react component

class Item extends Component {
	constructor(props) {
		super(props);
		// console.log('this is ItemProps history: ', props.history);
		// console.log(this.props.data.launch_site.site_name_long);
	}

	render() {
		let d = new Date(this.props.data.launch_date_local);
		let date = d.toDateString();

		return (
			<div>
				<Card style={{ maxWidth: 617 }} className="feedItemCard" hoverable={true} bordered={true}>
					<Avatar
						className="itemCardAvatar"
						src={this.props.data.links.mission_patch}
						shape="square"
						size={100}
					/>
					<div>
						<Meta
							cover={
								<img className="itemImage" alt="example" src={this.props.data.links.mission_patch} />
							}
							// avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							title={<h4 style={{ textAlign: 'right', fontSize: 15 }}>{date}</h4>}
							description={
								<div>
									<span
										className="price"
										style={{ fontFamily: 'bold', fontSize: 21, textAlign: 'right' }}
									>
										{this.props.data.mission_name}
									</span>
								</div>
							}
							className="itemCardMeta"
						/>
					</div>
				</Card>
			</div>
		);
	}
}
export default Item;
