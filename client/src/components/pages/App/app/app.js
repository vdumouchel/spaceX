// basic react imports
import React from 'react';
// advanced modules imports

// css & style imports
import 'antd/dist/antd.less';
import '../../../../App.css';
import '../../../../css/style';
// components imports

import Navbar from '../navbar/navbar';
import Feed from '../feed/feed';

// declaring variables

// const Logo = props => <Icon component={genie} {...props} />;

const app = props => {
	return (
		<div>
			<Navbar />
			<Feed />
		</div>
	);
};

export default app;
