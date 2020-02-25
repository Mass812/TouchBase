import React, { useState, useEffect } from 'react';
import SignInDumb from './SignInDumb';
import { auth } from '../../Firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
	const [ info, setInfo ] = useState({ email: '', password: '' });

	const history = useHistory();

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			console.log(user);
			if (user) {
				history.push('/feed');
			}
		});
	}, []);

	const userEmailEntered = (e) => {
		setInfo({ ...info, email: e.target.value });
	};

	const userPasswordEntered = (e) => {
		setInfo({ ...info, password: e.target.value });
	};

	const userInfoEntered = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(info.email, info.password)
			.then(() => history.push('/feed'));
	};

	console.log(info, ' info passed in');

	return (
		<SignInDumb
			userEmailEntered={userEmailEntered}
			userPasswordEntered={userPasswordEntered}
			password={info.password}
			email={info.email}
			userInfoEntered={userInfoEntered}
		/>
	);
};
export default SignIn;
