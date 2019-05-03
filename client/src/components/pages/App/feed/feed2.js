// basic react import
import React from 'react';

// advanced module imports

// style & css imports
import 'antd/dist/antd.less';
import '../../../../css/style';
import '../../../../css/views/feed.less';
import { Layout, Breadcrumb } from 'antd';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
// component imports
import ListAllLaunches from './listalllaunches/listalllaunches';
// import Tools from '';
// declaring variables

const { Content } = Layout;
// react component

const Feed2 = props => {
	console.log('this is FeedProps history: ', props.history);
	return (
		<Layout>
			<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 21px', fontFamily: 'medium' }}>
					<BreadcrumbItem>Home</BreadcrumbItem>
					<BreadcrumbItem>Available Launches</BreadcrumbItem>
				</Breadcrumb>
				<div className="feedContent">
					{/* <Tools /> */}
					<ListAllLaunches history={props.history} />
				</div>
			</Content>
		</Layout>
	);
};

export default Feed2;
