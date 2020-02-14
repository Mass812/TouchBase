
const initialState = {
	post: [
		{id: '1', userHandle: 'Doug Wellman', post: 'Do you remember the time . . . like Michael Jackson sung?'},
		{id: '2', userHandle: 'Ethan Wellman', post: 'Do you remember the time . . . I ate meat?'},
		{id: '3', userHandle: 'Ashton Wellman', post: 'Do you remember the time . . . I did my first push up?'}

	]
}








const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USER':
			return state;
		default:
			return state;
	}
};

export default postReducer;
