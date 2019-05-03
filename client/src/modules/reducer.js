import ACTIONS from './actions';

// basic Redux boilerplates
export const MainReducer = (state, action) => {
	console.log('This is MainReducer :', state, action);
	switch (action.type) {
		case ACTIONS.TEXT_INPUT_CHANGE:
			let newState = action.payload;
			return newState;
		default:
			return state;
	}
};
