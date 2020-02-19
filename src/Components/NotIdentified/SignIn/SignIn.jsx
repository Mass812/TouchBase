import React, { useState } from 'react';
import SignInDumb from './SignInDumb';

const SignIn = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ totalUserInfo, setTotalUserInfo ] = useState([]);

	const userEmailEntered = (e) => {
		console.log('sign in email', email);
		setEmail(e.target.value);
	};

	const userPasswordEntered = (e) => {
		console.log('sign in Password entered', e.target.value);
		setPassword(e.target.value);
	};

	const userInfoEntered = () => {
		setTotalUserInfo([ { email }, { password } ]);
	};

	console.log('total user info on sign in', totalUserInfo);
	return (
		<SignInDumb
			userEmailEntered={userEmailEntered}
			userPasswordEntered={userPasswordEntered}
			password={password}
			email={email}
			userInfoEntered={userInfoEntered}
		/>
	);
};
export default SignIn;
