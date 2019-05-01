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
import { logo } from '../../../../img/svg';
import Logout from '../logout/logout';

//declaring variables
const Logo = props => <Icon component={logo} {...props} />;
const { Header } = Layout;
const Search = Input.Search;

const dropmenu = (
	<Menu>
		<Menu.Item>
			<a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
				My profile
			</a>
		</Menu.Item>
		<Menu.Item>
			<a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
				My items
			</a>
		</Menu.Item>
		<Menu.Item>
			<a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
				My transactions
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
				<Logo className="logo" style={{ fontSize: '84px' }} />

				<Menu theme="light" mode="horizontal" style={{ lineHeight: '84px' }}>
					<Link to="/additem">
						<Button type="primary">Sell an item</Button>
					</Link>
					<Dropdown overlay={dropmenu}>
						<span style={{ marginRight: 24 }}>
							<Avatar icon="user" />
						</span>
					</Dropdown>
				</Menu>
				<div className="searchbar">
					<Search placeholder="Search tech gear" onSearch={value => console.log(value)} enterButton />
				</div>
			</Header>
		</Layout>
	);
};

export default Navbar;
