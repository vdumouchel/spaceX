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
import ListAllItems from './listallitems/listallitems';
// declaring variables

const { Content } = Layout;
// react component

const Feed = () => {
	return (
		<Layout>
			<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<BreadcrumbItem>Bazaar</BreadcrumbItem>
					<BreadcrumbItem>Available Gear</BreadcrumbItem>
				</Breadcrumb>
				<div className="feedContent">
					<ListAllItems />
				</div>
			</Content>
		</Layout>
	);
};

export default Feed;
