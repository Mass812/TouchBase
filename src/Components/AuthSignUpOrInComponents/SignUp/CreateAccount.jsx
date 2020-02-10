import React, { useState } from 'react';
import SignUp from './CreateAccountDumb';

const CreateAccount = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ verPassword, setVerPassword ] = useState('');
	const [ totalUserInfo, setTotalUserInfo ] = useState([]);
	const [ userHandle, setUserHandle ] = useState('');
	const [ errorIfFail, setErrorIfFail ] = useState('');
	const [ typed, setTyped ] = useState('');

	const regexEmail = /[a-zA-Z0-9].*?com$/;
	const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
	const regexSpecial = /(.*[!@#$%^&*])/;
	const regexCapital = /(.*[A-Z])/;
	const regexNumber = /(.*[0-9])/;

	const userEmailEntered = (e) => {
		if (regexEmail.test(e.target.value)) {
			console.log('user Email  Pass Regex', regexEmail.test(e.target.value));
			setEmail(e.target.value);
		}
	};
	console.log('password', password);

	const fireOffTheseRockets = (e) => {
		userPasswordEntered(e);
		generateMessage(e);
		setTyped(e.target.value);
	};

	const userPasswordEntered = (e) => {
		if (regexPassword.test(e.target.value)) {
			console.log('user Password Pass', regexPassword.test(e.target.value));
			setVerPassword(e.target.value);
		}
	};

	const userPasswordConfirmed = (e) => {
		if (e.target.value === verPassword) {
			setPassword(e.target.value);
		}
	};

	const userInfoEntered = () => {
		if (
			email &&
			password &&
			verPassword &&
			userHandle &&
			regexEmail.test(email) &&
			regexPassword.test(password)
		) {
			setTotalUserInfo([ { email }, { password }, { userHandle } ]);
		} else {
			setErrorIfFail('Error Handling Action, Please Try Again');
		}
		console.log('total user info captured', totalUserInfo);
	};

	const userHandleChose = (e) => {
		setUserHandle(e.target.value);
		//add server verification handle is available
	};

	const getErrors = () => {
		if (!email) {
			return <p>please add an email we can bind to your account</p>;
		} else if (!password) {
			return <p>please add a password for your account</p>;
		} else if (!verPassword) {
			return <p>please Confirm your Password </p>;
		} else if (!password || !verPassword || !email) {
			return <p>please complete all fields</p>;
		} else if (password) {
			return <p>Your All Set, Just give us your username.</p>;
		}
	};

	const generateMessage = () => {
		if (typed.length > 7) {
			if (!regexCapital.test(typed)) {
				return <p>Make sure to use a Capital Letter</p>;
			}
			if (!regexNumber.test(typed)) {
				return <p>Make sure to include a Number</p>;
			}
			if (!regexSpecial.test(typed)) {
				return <p>Make sure to include a Special Character (!@#$%^&*)</p>;
			}
		}
	};

	console.log('regex capital pass: ', regexCapital.test('Help'));

	const errorMessage = getErrors();
	const helpNotification = generateMessage();

	console.log('typed', typed);
	console.log('total user Info: ', totalUserInfo);

	return (
		<SignUp
			userEmailEntered={userEmailEntered}
			fireOffTheseRockets={fireOffTheseRockets}
			userPasswordConfirmed={userPasswordConfirmed}
			userInfoEntered={userInfoEntered}
			userHandleChose={userHandleChose}
			helpNotification={helpNotification}
			errorMessage={errorMessage}
			errorIfFail={errorIfFail}
			password={password}
			email={email}
			verPassword={verPassword}
			userHandle={userHandle}
		/>
	);
};
export default CreateAccount;
