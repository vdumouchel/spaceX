// basic react imports
import React from 'react';
// advanced modules imports

// css & style imports
import 'antd/dist/antd.less';
import '../../../../App.css';
import '../../../../css/style';
// components imports

import Navbar from '../navbar/navbar';
import Feed2 from '../feed/feed2';

// declaring variables

// const Logo = props => <Icon component={genie} {...props} />;

const app = props => {
	console.log('this is App props history: ', props.history);
	return (
		<div>
			<Navbar />
			<Feed2 />
		</div>
	);
};

export default app;
