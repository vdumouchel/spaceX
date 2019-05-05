// basic react import
import React, { Component } from 'react';

// advanced module imports

// style & css imports
import 'antd/dist/antd.less';
import '../../../../../css/style';
import '../../../../../css/views/feed.less';

import { Card, Icon } from 'antd';
import { DatePicker, Divider, Checkbox, Pagination } from 'antd';

import moment from 'moment';

import ListMyLaunches from './listmylaunches';

// declare variables

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Omelek Island', 'Cape Canaveral'];
const defaultCheckedList = ['Omelek Island', 'Cape Canaveral'];

// React component

class Tools extends Component {
	state = {
		checkedList: defaultCheckedList,
		indeterminate: true,
		checkAll: false,
		minValue: 0,
		maxValue: 2,
	};

	onChange = checkedList => {
		this.setState({
			checkedList,
			indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
			checkAll: checkedList.length === plainOptions.length,
		});
	};

	onCheckAllChange = e => {
		this.setState({
			checkedList: e.target.checked ? plainOptions : [],
			indeterminate: false,
			checkAll: e.target.checked,
		});
	};

	handleChange = value => {
		if (value <= 1) {
			this.setState({
				minValue: 0,
				maxValue: 2,
			});
		} else {
			this.setState({
				minValue: this.state.maxValue,
				maxValue: value * 2,
			});
		}
	};

	render() {
		return (
			<div style={{ color: 'rgba(16, 11, 10, 0.45)' }}>
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
						<br />
						<div>
							<br />
							<CheckboxGroup
								options={plainOptions}
								value={this.state.checkedList}
								onChange={this.onChange}
							/>
						</div>
						<Divider />
						<p>My Launches</p>
						<ListMyLaunches />
						<br />
						<div style={{ textAlign: 'center' }}>
							<Pagination defaultCurrent={1} defaultPageSize={2} total={2} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Tools;
