import React, { useEffect } from 'react'
import './PersonalProfile.scss'
import Navbar from '../Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBasicUserDetails, findUserInfo } from '../../redux/actions/profileActions'
import { getCurrentUserByAuth } from '../../redux/actions/authActions'
import { useHistory } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'

const PersonalProfile = () => {
	const defaultPic = require('../../Assets/default.png')
	const param = useParams().id
	const dispatch = useDispatch()

	useEffect(
		() => {
			dispatch(findUserInfo(param))
			dispatch(getCurrentUserByAuth())
			dispatch(getBasicUserDetails())
		},
		[
			dispatch,
			param
		]
	)

	const discoveredUserInfo = useSelector((state) => state.profile.discoveredUserInfo)
	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)
	const getCurrentSignedInUserId = useSelector((state) => state.auth.getCurrentSignedInUserId)
	const isLoading = useSelector((state) => state.loading.isLoading)
	const history = useHistory()

	const pushToProfile = (e) => {
		e.preventDefault()
		console.log('disc userId', discoveredUserInfo.userId)
		history.push(`/edit_personal_profile/${basicUserInfo.userId}`)
	}

	console.log('discUserInfo', getCurrentSignedInUserId)
	const editProfile =
		param === getCurrentSignedInUserId ? (
			<button className='nav-button' onClick={pushToProfile}>
				edit profile
			</button>
		) : null

	return (
		<div>
			<Navbar />
			{!isLoading ? (
				<div className='edge-case-large'>
					<section className='profile-container'>
						<div>
							{editProfile}
							<div>
								<img
									className='profile-image'
									src={discoveredUserInfo ? discoveredUserInfo.url : defaultPic}
									alt={'default'}
								/>
							</div>
							<div className='profile-user-display-name'>
								{discoveredUserInfo ? discoveredUserInfo.displayName : null}
							</div>
							<div className='under-icon-pair-group'>
								<FontAwesomeIcon
									icon={faBriefcase}
									size={'sm'}
									color={'white'}
								/>{' '}
								<span className='image-upload-bar'>
									{discoveredUserInfo ? discoveredUserInfo.work : 'Work'}
								</span>
							</div>
							<div className='under-icon-pair-group'>
								<FontAwesomeIcon
									icon={faMapMarkerAlt}
									size={'sm'}
									color={'white'}
								/>{' '}
								<span className='image-upload-bar'>
									{discoveredUserInfo ? discoveredUserInfo.location : 'location'}
								</span>
							</div>
						</div>
						<div className='details-block'>
							<div className='profile-details'>
								<div className='profile-detail-item'>
									<span className='profile-detail-key-font'>Bio: </span>
									<blockquote className='profile-detail-value-font'>
										{discoveredUserInfo ? (
											discoveredUserInfo.bio
										) : (
											''
										)}
									</blockquote>
								</div>
								<div className='profile-detail-item'>
									<span className='profile-detail-key-font'>Hobbies:</span>
									<blockquote className='profile-detail-value-font'>
										{discoveredUserInfo ? (
											discoveredUserInfo.hobbies
										) : (
											''
										)}
									</blockquote>
								</div>
								<button
									onClick={() => history.push('/feed')}
									className='nav-button'>
									Back
								</button>
							</div>
						</div>
					</section>
				</div>
			) : (
				<Spinner />
			)}
		</div>
	)
}
export default PersonalProfile
