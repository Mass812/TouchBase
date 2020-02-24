import { LOADING, DONE_LOADING, FETCH_ERROR} from '../types';

const initialState = {
	isLoading: false,
	fetched: false,
	error: null,
};

const loadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING:
			return { ...state, isLoading: true};
		case DONE_LOADING: 
		return {...state, isLoading: false, fetched: true, error: action.payload };
		case FETCH_ERROR: 
		return {...state, isLoading: false, fetched: true, error: action.payload }
		default:
			return state;
	}
};

export default loadingReducer;
