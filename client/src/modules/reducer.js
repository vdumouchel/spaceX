import ACTIONS from './actions';
import _ from 'lodash';

// basic Redux boilerplates
const MainReducer = (state, action) => {
	console.log('This is MainReducer :', state, action);
	switch (action.type) {
		case ACTIONS.TEXT_INPUT_CHANGE:
			let newState = _.cloneDeep(state);
			newState.user_fullname = action.payload;
			console.log('this is newState: ', newState);

			return newState;
		default:
			return state;
	}
};

export default MainReducer;
