// basic react import
import React from 'react';

// advanced module imports
import { Link } from 'react-router-dom';
// style & css imports
import 'antd/dist/antd.less';
import '../../../../css/style';
import '../../../../css/views/navbar.less';
import { Layout, Menu, Icon, Button, Input, Dropdown, Avatar } from 'antd';

// components imports
import { blueLogo } from '../../../../img/svg';
import Logout from '../logout/logout';

//declaring variables
const Bluelogo = props => <Icon component={blueLogo} {...props} />;
const { Header } = Layout;
const Search = Input.Search;

const dropmenu = (
	<Menu>
		<Menu.Item>
			<a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
				Profile
			</a>
		</Menu.Item>
		<Menu.Item>
			<a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
				My Launches
			</a>
		</Menu.Item>
		<Menu.Item>
			<Logout />
		</Menu.Item>
	</Menu>
);

// react component
const Navbar = () => {
	return (
		<Layout className="layout">
			<Header theme="light">
				<Bluelogo className="logo" style={{ fontSize: 84, marginTop: 15, paddingLeft: 20 }} />

				<Menu theme="light" mode="horizontal" style={{ lineHeight: '84px' }}>
					<Dropdown overlay={dropmenu}>
						<span style={{ marginRight: 24 }}>
							<Avatar icon="user" />
						</span>
					</Dropdown>
				</Menu>
				<div className="searchbar">
					<Search placeholder="Search a specific launch" onSearch={value => console.log(value)} enterButton />
				</div>
			</Header>
		</Layout>
	);
};

export default Navbar;
