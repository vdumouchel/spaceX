// basic react import
import React from 'react';

// advanced module imports

// style & css imports
import 'antd/dist/antd.less';
import '../../../../css/style';
import '../../../../css/views/feed.less';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
// component imports
import ListAllLaunches from './listalllaunches/listalllaunches';
import Sider from './sider/sider';
// import Tools from '';
// declaring variables

const { Content } = Layout;
// react component

const Feed2 = props => {
	// console.log('this is FeedProps history: ', props.history);
	return (
		<Layout>
			<Breadcrumb style={{ margin: '25px 75px', fontFamily: 'medium' }}>
				<BreadcrumbItem>Home</BreadcrumbItem>
				<BreadcrumbItem>Available Launches</BreadcrumbItem>
			</Breadcrumb>
			<Row>
				<Col span={7} offset={2}>
					<Sider width={300} />
				</Col>

				<Col span={13} offset={1}>
					<Content style={{ padding: '0 50px', width: '100%', maxWidth: 717, paddingRight: 'auto' }}>
						<div className="feedContent">
							<ListAllLaunches history={props.history} />
						</div>
					</Content>
				</Col>
			</Row>
		</Layout>
	);
};

export default Feed2;
