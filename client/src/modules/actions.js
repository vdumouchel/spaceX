const TEXT_INPUT_CHANGE = 'TEXT_INPUT_CHANGE';

const textInputChange = data => ({
	type: TEXT_INPUT_CHANGE,
	payload: data,
});

export default {
	TEXT_INPUT_CHANGE,
	textInputChange,
};
