import ActionButton from 'antd/lib/modal/ActionButton';

const TEXT_INPUT_CHANGE = 'TEXT_INPUT_CHANGE';

const testInputChange = data => ({
	type: TEXT_INPUT_CHANGE,
	payload: data,
});

export default {
	TEXT_INPUT_CHANGE,
	testInputChange,
};
