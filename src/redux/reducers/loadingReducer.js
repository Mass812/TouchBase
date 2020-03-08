import { LOADING, DONE_LOADING, FETCH_ERROR} from '../types';

const initialState = {
	isLoading: false,

};

const loadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING:
			return { ...state, isLoading: action.isLoading};

		default:
			return state;
	}
};

export default loadingReducer;
