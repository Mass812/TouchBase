import React, { useEffect } from 'react'
import './PersonalProfile.scss'
import Navbar from '../Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { auth, db } from '../Firebase/firebaseConfig'
import { getUserDetails, createUserProfile } from '../../redux/actions/profileActions'
import { useHistory } from 'react-router-dom'

const PersonalProfile = () => {
	const defaultPic = require('../../Assets/default.png')
	const param = useParams().id
	const userInfo = useSelector((state) => state.profile.data)
	const userProfile = useSelector((state) => state.profile.profile)

	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(
		() => {
			async function lookForProfileOrCreateOne() {
				await dispatch(getUserDetails(param))
				await dispatch(createUserProfile(userInfo))
			}
			// Execute the created function directly
			lookForProfileOrCreateOne()
		},
		[
			dispatch,
			param
		]
	)

	console.log('userInfo in PersProf Component: ', userInfo)
	console.log('userProfile in PersProf Component: ', userProfile)

	return (
		<div>
			<Navbar />
			<div className='edge-case-large'>
				<section className='profile-container'>
					<button
						onClick={() => history.push(`/edit_personal_profile/${userInfo.userId}`)}>
						Edit Profile
					</button>

					<div>
						<div>
							<div className='user-display-name'>
								{userInfo ? userInfo.displayName : null}
							</div>
							<img
								className='profile-image'
								src={userInfo ? userInfo.url : defaultPic}
								alt={'default'}
							/>
						</div>
						<div className='under-icon-pair-group'>
							<FontAwesomeIcon icon={faBriefcase} size={'sm'} color={'white'} />{' '}
							<span className='image-upload-bar'>
								{userProfile ? userProfile.work : 'Work'}
							</span>
						</div>
						<div className='under-icon-pair-group'>
							<FontAwesomeIcon
								icon={faMapMarkerAlt}
								size={'sm'}
								color={'white'}
							/>{' '}
							<span className='image-upload-bar'>
								{userProfile ? userProfile.location : 'location'}
							</span>
						</div>
					</div>
					<div className='details-block'>
						<div className='profile-details'>
							<div className='profile-detail-item'>
								<span className='profile-detail-key-font'>Bio: </span>
								<blockquote className='profile-detail-value-font'>
									{userProfile ? userProfile.bio : 'Bio Details'}
								</blockquote>
							</div>
							<div className='profile-detail-item'>
								<span className='profile-detail-key-font'>Hobbies:</span>
								<blockquote className='profile-detail-value-font'>
									{userProfile ? userProfile.hobbies : 'edit hobbies'}
								</blockquote>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}
export default PersonalProfile
