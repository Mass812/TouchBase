import React, { useEffect } from 'react'
import './PersonalProfile.scss'
import Navbar from '../Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { auth, db } from '../Firebase/firebaseConfig'
import {
	getUserDetailsFromPostId,
	createUserProfileAutomatically
} from '../../redux/actions/profileActions'
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
				await dispatch(getUserDetailsFromPostId(param))
				await dispatch(createUserProfileAutomatically(userInfo))
						
			}
			// Execute the created function directly
			lookForProfileOrCreateOne()
		},
		[
			dispatch,
			param
		]
	)

	const EditProfileButton = userInfo.userId === auth.currentUser.uid ? (<button 
		
		className='submit-button'
		onClick={() =>
			auth.currentUser.uid === userInfo.userId
				? history.push(`/edit_personal_profile/${userInfo.userId}`)
				: null}>
		Edit Profile
	</button>) : null



	return (
		<div>
			<Navbar />
			<div className='edge-case-large'>
				<section className='profile-container'>
					<div>
						<div>
							<img
								className='profile-image'
								src={userInfo ? userInfo.url : defaultPic}
								alt={'default'}
							/>
						</div>
						<div className='profile-user-display-name'>
							{userInfo ? userInfo.displayName : null}
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
					{EditProfileButton}
					
				</section>
			</div>
		</div>
	)
}
export default PersonalProfile
