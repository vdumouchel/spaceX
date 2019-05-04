// basic react import
import React from 'react';

// advanced module imports
import { Query } from 'react-apollo';
// style & css imports
import 'antd/dist/antd.less';
import '../../../../../css/style';
import '../../../../../css/views/feed.less';
import { Card } from 'antd';

// component imports
import Tools from './tools';
// declaring variables

// react component

const Sider = props => {
	// console.log('this is listAllLaunches history: ', props.history);
	return (
		<div>
			<Card>
				<div>
					<Tools />
				</div>
			</Card>
		</div>
	);
};

export default Sider;
