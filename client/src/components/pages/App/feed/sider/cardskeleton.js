// basic react import
import React from 'react';

//css & styles import
import { Skeleton, Card, Icon, Avatar } from 'antd';

//declare variables
const { Meta } = Card;

// react component

export default class CardSkeleton extends React.Component {
	state = {
		loading: true,
	};

	render() {
		const { loading } = this.state;

		return (
			<div>
				<Card
					style={{ width: 460, marginTop: 16 }}
					actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
				>
					<Skeleton loading={loading} avatar active>
						<Meta
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							title="Card title"
							description="This is the description"
						/>
					</Skeleton>
				</Card>
				<Card
					style={{ width: 460, marginTop: 16 }}
					actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
				>
					<Skeleton loading={loading} avatar active>
						<Meta
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							title="Card title"
							description="This is the description"
						/>
					</Skeleton>
				</Card>
			</div>
		);
	}
}
