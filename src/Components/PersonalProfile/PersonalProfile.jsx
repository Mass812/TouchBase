import React, { useEffect } from 'react'
import './PersonalProfile.scss'
import Navbar from '../Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faBriefcase, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { auth, db } from '../Firebase/firebaseConfig'
import { getUserDetailsFromPostId, getBasicUserDetails } from '../../redux/actions/profileActions'
import { useHistory } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'

const PersonalProfile = () => {
	const defaultPic = require('../../Assets/default.png')
	const param = useParams().id
	const getProfile = useSelector((state) => state.profile.usersDocFromPic)
	const basicUserDetails = useSelector((state) => state.profile.basicUserDetails)
	const isLoading = useSelector((state) => state.loading.isLoading)
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(
		() => {
		
			function lookForProfileOrCreateOne() {
			dispatch(getUserDetailsFromPostId(param))
			}
			// Execute the created function directly
			lookForProfileOrCreateOne()
		},
		[
			dispatch,
			param,
			
		]
	)

	return (
		<div>
			<Navbar />
		{!isLoading ? (
			<div className='edge-case-large'>
				<section className='profile-container'>
					<div>
						<div>
							<img
								className='profile-image'
								src={getProfile ? getProfile.url : defaultPic}
								alt={'default'}
							/>
						</div>
						<div className='profile-user-display-name'>
							{getProfile ? getProfile.displayName : null}
						</div>
						<div className='under-icon-pair-group'>
							<FontAwesomeIcon icon={faBriefcase} size={'sm'} color={'white'} />{' '}
							<span className='image-upload-bar'>
								{getProfile ? getProfile.work : 'Work'}
							</span>
						</div>
						<div className='under-icon-pair-group'>
							<FontAwesomeIcon
								icon={faMapMarkerAlt}
								size={'sm'}
								color={'white'}
							/>{' '}
							<span className='image-upload-bar'>
								{getProfile ? getProfile.location : 'location'}
							</span>
						</div>
					</div>
					<div className='details-block'>
						<div className='profile-details'>
							<div className='profile-detail-item'>
								<span className='profile-detail-key-font'>Bio: </span>
								<blockquote className='profile-detail-value-font'>
									{getProfile ? getProfile.bio : 'Bio Details'}
								</blockquote>
							</div>
							<div className='profile-detail-item'>
								<span className='profile-detail-key-font'>Hobbies:</span>
								<blockquote className='profile-detail-value-font'>
									{getProfile ? getProfile.hobbies : 'edit hobbies'}
								</blockquote>
							</div>
							<button onClick={() => history.push('/feed')} className='nav-button'>
								Back
							</button>
						</div>
					</div>
				</section>
			</div>) : (<Spinner/>)}
		</div>
	)
}
export default PersonalProfile
