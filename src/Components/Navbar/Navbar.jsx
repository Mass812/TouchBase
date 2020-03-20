import React, { useEffect, Fragment } from 'react'
import './Navbar.scss'
import { Link, useHistory } from 'react-router-dom'
import SignOutButton from './SignOutButton/SignOutButton'
import { useSelector, useDispatch } from 'react-redux'
import { getBasicUserDetails } from '../../redux/actions/profileActions'
import { LOADING } from '../../redux/types'

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
			const waitForProps = async () => {
				if (!basicUserInfo) {
					dispatch(getBasicUserDetails())
					dispatch({ type: LOADING, isLoading: true })
					await basicUserInfo
					dispatch({ type: LOADING, isLoading: false })
				}
			}
			waitForProps()
		},
		[
			dispatch
		]
	)

	const pushToProfile = (e) => {
		e.preventDefault()
		history.push(`/personal_profile/${basicUserInfo.userId}`)
	}

	return (
		<div className='navbar'>
			<div className='nav-image-container'>
				<Fragment>
					<div className='nav-image-block'>
						<img
							onClick={pushToProfile}
							className='nav-user-image'
							src={basicUserInfo ? basicUserInfo.url : defaultPic}
							alt={basicUserInfo ? basicUserInfo.displayName : 'user name'}
						/>
					</div>
					<h6 style={{ fontSize: '3px', marginTop: '-15px', color: 'darkGrey' }}>Edit</h6>
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
