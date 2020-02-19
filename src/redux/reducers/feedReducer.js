const initialState = {
	
};

const feedReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_POST':
			return {...state, payload: action.payload};
		case "CREATE_POST_ERROR":
			console.log('Post Failed:  error: ');
			return state;
		case 'GET_POSTS': 
			return {...state, posts: action.data};
		case 'GET-POST-ERROR':
			return console.log('error in fetching posts');	
		default:
			return state;
	}
};

export default feedReducer;
