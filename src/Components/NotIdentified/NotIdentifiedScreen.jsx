import React from 'react'
import './NotIdentifiedScreen.scss'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../Firebase/firebaseConfig'
import { getUserCardDetails } from '../../redux/actions/feedActions'
import {} from '../../redux/actions/profileActions';
import { useDispatch } from 'react-redux'

const NotIdentifiedScreen = (e) => {
	const history = useHistory()
	const dispatch = useDispatch()

	const signInAsGuest = async (e) => {
		//TODO set up reducer and action later
		e.preventDefault()

		await auth
			.signInWithEmailAndPassword('guest@guest.com', 'Test123!')
			.then(() => dispatch(getUserCardDetails()))
			.then(() => {
				history.push(`/feed`)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const logo = require('../../Assets/touchbase_logo2.png')

	return (
		<div className='not-identified-container'>
			<div>
				<div className='not-identified-title'>
					<span
						style={{
							color: 'white'
						}}>
						Touch
					</span>Base
				</div>
				<span className='not-identified-subtitle'>A Social Networking Platform</span>
			</div>

			<div className='sign-options-logo'>
				<img src={logo} alt={'TouchBase Logo'} className='home-logo' />
			</div>

			<div className='options-button-splay'>
				<Link to='/sign_in'>
					<button className='not-identifiable-screen-button'>Sign In</button>
				</Link>
				<Link to='/sign_up'>
					<button className='not-identifiable-screen-button'>New User</button>
				</Link>
			</div>
			<div>
				<button onClick={signInAsGuest} className='nav-button'>
					Site Guest
				</button>
			</div>
		</div>
	)
}
export default NotIdentifiedScreen
