//basic react imports
import React from 'react';
// css & style imports
import 'antd/dist/antd.less';
import '../../../css/style';

const nomatch = props => {
	console.log(props);
	return (
		<div>
			<h1>Error 404. Please go back to previous page.</h1>
		</div>
	);
};

export default nomatch;
