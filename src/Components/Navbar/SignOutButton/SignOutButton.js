import React from 'react';
import { auth } from '../../Firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';
import '../Navbar.scss';

const SignOutButton = () => {
	const history = useHistory();

	const signOut = async () => {
		console.log('currentUser', auth.currentUser);
		try {
			console.log('signed out user', auth.currentUser);
			await auth.signOut().then(() =>{
				localStorage.clear();
				history.push('/')});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='sign-out-button'>
			<button onClick={signOut} className='nav-button'>
				Sign Out
			</button>
		</div>
	);
};
export default SignOutButton;
