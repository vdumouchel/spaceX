// basic react import
import React from 'react';

// advanced module imports

// style & css imports
import 'antd/dist/antd.less';
import '../../../../../css/style';
import '../../../../../css/views/feed.less';

import { Card, Icon } from 'antd';
import { DatePicker, Divider } from 'antd';

import moment from 'moment';

// declare variables

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

// React component

const Tools = () => {
	return (
		<div>
			<h1>
				<Icon type="tool" /> Tools
			</h1>
			<div style={{ color: 'rgba(16, 11, 10, 0.45)' }}>
				<div>
					<Divider />
					<p>By travel dates</p>
					<RangePicker
						defaultValue={[moment('2019/05/04', dateFormat), moment('2019/05/05', dateFormat)]}
						format={dateFormat}
					/>
					<Divider />
					<span>By launch site</span>
				</div>
			</div>
		</div>
	);
};

export default Tools;
