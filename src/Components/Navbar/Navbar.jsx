import React, { useEffect, Fragment } from 'react'
import './Navbar.scss'
import { Link, useHistory } from 'react-router-dom'
import SignOutButton from './SignOutButton/SignOutButton'
import { useSelector, useDispatch } from 'react-redux'
import { getBasicUserDetails } from '../../redux/actions/profileActions'

//dispatch = useDispatch();
//

const Navbar = () => {
	// TODO add reducer for getting user.uid
	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)
	const history = useHistory()
	const dispatch = useDispatch()
	const defaultPic = require('../../Assets/default.png')

	useEffect(
		() => {
			dispatch(getBasicUserDetails())
		},
		[
			dispatch
		]
	)

	const pushToProfile = (e) => {
		e.preventDefault()
		console.log(basicUserInfo.userId)
		history.push(`/personal_profile/${basicUserInfo.userId}`)
	}
	console.log('nav:', basicUserInfo)

	return (
		<div className='navbar'>
			<div className='nav-image-container'>
				<Fragment>
					<div className='nav-image-block'>
						<img
							onClick={pushToProfile}
							className='nav-user-image'
							src={basicUserInfo.url ? basicUserInfo.url : defaultPic}
							alt={basicUserInfo.displayName}
						/>
					</div>
					<div style={{ fontSize: '6px', marginTop: '-10px', color: 'darkGrey' }}>
						Edit
					</div>
				</Fragment>
			</div>

			<div className='nav-icon-bar'>
				{/* <Link to= `/edit_personal_profile/signedInUserId`> */}

				{/* </Link> */}

				<button
					className='nav-button'
					style={{ width: '20px', borderRadius: '50%' }}
					onClick={() => history.push(`/user_help`)}>
					?
				</button>

				<Link to='/feed'>
					<button className='nav-button'>Feed</button>
				</Link>

				<SignOutButton />
			</div>
		</div>
	)
}
export default Navbar
