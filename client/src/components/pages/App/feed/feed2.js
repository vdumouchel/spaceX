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
// import Tools from '';
// declaring variables

const { Content } = Layout;
// react component

const Feed2 = props => {
	// console.log('this is FeedProps history: ', props.history);
	return (
		<Layout>
			<Breadcrumb style={{ margin: '16px 21px', fontFamily: 'medium' }}>
				<BreadcrumbItem>Home</BreadcrumbItem>
				<BreadcrumbItem>Available Launches</BreadcrumbItem>
			</Breadcrumb>
			<Row>
				<Col span={6}>{/* <Sider width={200} /> */}</Col>

				<Col span={13} offset={5}>
					<Content style={{ padding: '0 50px', width: '100%', paddingRight: 'auto' }}>
						<div className="feedContent" style={{ textAlign: 'right' }}>
							{/* <Tools /> */}
							<ListAllLaunches history={props.history} style={{ textAlign: 'right' }} />
						</div>
					</Content>
				</Col>
			</Row>
		</Layout>
	);
};

export default Feed2;
