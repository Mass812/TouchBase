import React, { useState } from 'react'
import SignUp from './CreateAccountDumb'
import { auth } from '../../Firebase/firebaseConfig'
import { useHistory } from 'react-router-dom'
import { getBasicUserDetails } from '../../../redux/actions/profileActions'
import {useDispatch} from 'react-redux'

const CreateAccount = () => {



	const [
		verPassword,
		setVerPassword
	] = useState('')
	const [
		typed,
		setTyped
	] = useState('')
	const [
		totalUserInfo,
		setTotalUserInfo
	] = useState({
		email: '',
		password: ''
	})

	const regexEmail = /[a-zA-Z0-9].*?com$/
	const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
	const regexSpecial = /(.*[!@#$%^&*])/
	const regexCapital = /(.*[A-Z])/
	const regexNumber = /(.*[0-9])/

	const history = useHistory()
	const dispatch = useDispatch();

	const userEmailEntered = (e) => {
		if (regexEmail.test(e.target.value)) {
			console.log('user Email  Pass Regex', regexEmail.test(e.target.value))
			setTotalUserInfo({ ...totalUserInfo, email: e.target.value })
		}
	}

	const fireOffTheseRockets = (e) => {
		userPasswordEntered(e)
		generateMessage(e)
		setTyped(e.target.value)
	}

	const userPasswordEntered = (e) => {
		if (regexPassword.test(e.target.value)) {
			console.log('user Password Pass', regexPassword.test(e.target.value))
			setVerPassword(e.target.value)
		}
	}

	const userPasswordConfirmed = (e) => {
		if (e.target.value === verPassword) {
			setTotalUserInfo({ ...totalUserInfo, password: e.target.value })
		}
	}

	//created with displayName
	const userInfoEntered = async () => {
		console.log('Total info captured', totalUserInfo)

		await auth
			.createUserWithEmailAndPassword(totalUserInfo.email, totalUserInfo.password)
			.catch((err) => console.error(400, err, 'error creating user'))
		const setParam = auth.currentUser.uid

		await Promise.resolve()
			.then(() => {
				dispatch(getBasicUserDetails())
			})
			.then(() => {
				history.push(`/sign_up_more_info/${setParam}`)
			})
	}

	const getErrors = () => {
		if (!totalUserInfo.email) {
			return <p>please add an email we can bind to your account</p>
		} else if (!totalUserInfo.password) {
			return <p>please add a password for your account</p>
		} else if (!verPassword) {
			return <p>please Confirm your Password </p>
		} else if (!totalUserInfo.password || !verPassword || !totalUserInfo.email) {
			return <p>please complete all fields</p>
		} else if (totalUserInfo.password) {
			return <p>Your All Set, Just give us your username.</p>
		}
	}

	const generateMessage = () => {
		if (typed.length > 7) {
			if (!regexCapital.test(typed)) {
				return <p>Make sure to use a Capital Letter</p>
			}
			if (!regexNumber.test(typed)) {
				return <p>Make sure to include a Number</p>
			}
			if (!regexSpecial.test(typed)) {
				return <p>Make sure to include a Special Character (!@#$%^&*)</p>
			}
		}
	}

	console.log(totalUserInfo)
	const errorMessage = getErrors()
	const helpNotification = generateMessage()

	return (
		<SignUp
			userEmailEntered={userEmailEntered}
			fireOffTheseRockets={fireOffTheseRockets}
			userPasswordConfirmed={userPasswordConfirmed}
			userInfoEntered={userInfoEntered}
			helpNotification={helpNotification}
			errorMessage={errorMessage}
			password={totalUserInfo.password}
			email={totalUserInfo.email}
			verPassword={verPassword}
		/>
	)
}
export default CreateAccount
