import React from 'react';
import { auth } from '../../Components/Firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';

const SignOutButton = () => {
	const history = useHistory();

	const signOut = async () => {
        console.log('currentUser', auth.currentUser);
		try {
			await auth.signOut();
			console.log('signed out user', auth.currentUser);
			history.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='sign-out-button'>
			<button onClick={signOut}>Sign Out</button>
		</div>
	);
};
export default SignOutButton;
