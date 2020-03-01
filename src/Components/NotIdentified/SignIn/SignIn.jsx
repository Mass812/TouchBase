import React, { useState, useEffect } from 'react';
import SignInDumb from './SignInDumb';
import { auth } from '../../Firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getUserCardDetails} from '../../../redux/actions/feedActions';

const SignIn = () => {
	const [ info, setInfo ] = useState({ email: '', password: '' });
	const [signOnError, setSignOnError]=useState(false);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			console.log(user);
			if (user) {
				history.push(`/feed`);
			}
		});
	}, [history]);

	const userEmailEntered = (e) => {
		setInfo({ ...info, email: e.target.value });
	};

	const userPasswordEntered = (e) => {
		setInfo({ ...info, password: e.target.value });
	};

	const userInfoEntered = async (e) => {
		e.preventDefault();
		let userRef=[];
			await	auth
			.signInWithEmailAndPassword(info.email, info.password)
		
			.then(()=>	 dispatch(getUserCardDetails()))
			.then(() => history.push('/feed'))
			.catch(err=>{
				setSignOnError(true);
				console.log(err);
			});
	};

	console.log(info, ' info passed in');

	return (
		<SignInDumb
			userEmailEntered={userEmailEntered}
			userPasswordEntered={userPasswordEntered}
			password={info.password}
			email={info.email}
			userInfoEntered={userInfoEntered}
			error={signOnError}
		/>
	);
};
export default SignIn;
