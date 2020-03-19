import React, { useState } from 'react'
import SignInDumb from './SignInDumb'
import { auth } from '../../Firebase/firebaseConfig'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBasicUserDetails } from '../../../redux/actions/profileActions'

const SignIn = () => {
	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)

	const [
		info,
		setInfo
	] = useState({
		email: '',
		password: ''
	})
	const [
		signOnError,
		setSignOnError
	] = useState(false)
	const history = useHistory()
	const dispatch = useDispatch()

	const userEmailEntered = (e) => {
		setInfo({
			...info,
			email: e.target.value
		})
	}

	const userPasswordEntered = (e) => {
		setInfo({
			...info,
			password: e.target.value
		})
	}

	const userInfoEntered = async (e) => {
		e.preventDefault()
		dispatch({ type: 'LOADING', isLoading: true })
		await auth
			.signInWithEmailAndPassword(info.email, info.password)
			.then(() => {
				dispatch(getBasicUserDetails())
			})
			.then(async () => {
				await basicUserInfo
			})
			.then(() => {
				dispatch({ type: 'LOADING', isLoading: false })
				history.push(`/feed`)
			})
			.catch((err) => {
				setSignOnError(true)
				console.log(err)
			})
	}

	return (
		<SignInDumb
			userEmailEntered={userEmailEntered}
			userPasswordEntered={userPasswordEntered}
			password={info.password}
			email={info.email}
			userInfoEntered={userInfoEntered}
			error={signOnError}
		/>
	)
}
export default SignIn
