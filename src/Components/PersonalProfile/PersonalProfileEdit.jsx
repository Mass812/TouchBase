import React, { useState, useEffect, Fragment, useRef } from 'react'
import './PersonalProfile.scss'
import Navbar from '../Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import firebase, { auth, db } from '../Firebase/firebaseConfig'
import {
	updateAndReturnUserProfile,
	getBasicUserDetails,
	deleteAllUserRelatedInfo
} from '../../redux/actions/profileActions'
import { useDispatch, useSelector } from 'react-redux'
import '../../App.scss'
import { useHistory } from 'react-router-dom'

const PersonalProfileEdit = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const isLoading = useSelector((state) => state.loading.isLoading)

	//move to initial state of editProfile Reducer
	useEffect(
		() => {
			dispatch(getBasicUserDetails())
		},
		[
			dispatch
		]
	)

	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)
	//userProfile data from page user

	const [
		completed,
		setCompleted
	] = useState(false)

	const [
		newProfileData,
		setNewProfileData
	] = useState({
		work: basicUserInfo.work,
		location: basicUserInfo.location,
		bio: basicUserInfo.bio,
		hobbies: basicUserInfo.hobbies
	})

	const handleWork = (e) => {
		setNewProfileData({ ...newProfileData, work: e.target.value })
	}
	const handleLocation = (e) => {
		setNewProfileData({ ...newProfileData, location: e.target.value })
	}
	const handleBio = (e) => {
		setNewProfileData({ ...newProfileData, bio: e.target.value })
	}
	const handleHobbies = (e) => {
		setNewProfileData({ ...newProfileData, hobbies: e.target.value })
	}

	//sideDrawer Delete

	const [
		expandDeleteSideDrawer,
		setExpandDeleteSideDrawer
	] = useState(false)

	const expandDeleteSideDrawerHandler = () => {
		setExpandDeleteSideDrawer(!expandDeleteSideDrawer)

		setTimeout(() => {
			window.scrollTo(0, 1900)
		}, 0.1)
	}

	const [
		pic,
		setPic
	] = useState({
		newImage: '',
		url: basicUserInfo.url,
		progress: 0,
		name: basicUserInfo.displayName
	})

	//move to action creator
	const fileSelector = (e) => {
		console.log(e.target.files[0])
		if (e.target.files[0]) {
			setPic({ ...pic, newImage: e.target.files[0], name: basicUserInfo.userId })
		}
	}

	//move to action creator
	const updatePic = () => {
		if (pic.newImage) {
			//args file

			const storageRef = firebase.storage()
			const uploadImage = storageRef
				.ref(`images/${basicUserInfo.userId}`) //state.profile.data
				.put(pic.newImage)
			uploadImage.on(
				'state_changed',
				(snapshot) => {
					const progressBar = Math.round(
						snapshot.bytesTransferred / snapshot.totalBytes * 100
					)
					setPic({ ...pic, progress: progressBar })
				},
				(error) => {
					console.log('Error uploading photo', error)
				},
				() => {
					storageRef.ref('images').child(pic.name).getDownloadURL().then((url) => {
						//reducer dispatch set_url
						setPic({ ...pic, url })
						//update users file
						firebase
							.firestore()
							.collection('users')
							.doc(auth.currentUser.uid)
							.update({ url: url })
							.then(() => {
								dispatch(getBasicUserDetails())
							})
							.then(
								firebase
									.firestore()
									.collection('posts')
									.where('userId', '==', auth.currentUser.uid)
									.get()
									.then((snap) => {
										snap.forEach((doc) => {
											var specificPostsWithUserId = db
												.collection('posts')
												.doc(doc.id)

											specificPostsWithUserId.update({
												url: url
											})
										})
										setCompleted(true)
									})
							)
					})
				}
			)
		}
		// TODO get user id here & attach this url to more user data doc
	}

	// TODO useEffect hook parameter pic.url to update users profile

	//change to dispatch selector props

	const handleProfileUpdate = async () => {
		dispatch({ type: 'LOADING', isLoading: true })
		dispatch(updateAndReturnUserProfile(auth.currentUser.uid, newProfileData))
		//use reducer action pair
		updatePic()
		dispatch({ type: 'LOADING', isLoading: false })
		setTimeout(() => {
			history.push('/feed')
		}, 500)
	}

	return (
		<div>
			<Navbar />

			{!isLoading ? (
				<div className='edge-case-large'>
					<section className='profile-container'>

					<div className ='profile-user-display-name '>

					{basicUserInfo.displayName}
					</div>

						<div>
							<div>
								<img
									className='profile-image'
									src={`${basicUserInfo.url}`}
									alt={'default'}
								/>
							</div>
							<div className='under-icon-pair-group'>
							
								{!pic.newImage ? (
									<div>
										<span className='submit-button'>
											<label htmlFor='changePic'>
												<FontAwesomeIcon
													icon={faCloudUploadAlt}
													size={'1x'}
													color={'white'}
												/>{' '}
												<span>Update Profile Pic</span>
											</label>
										</span>

										<input
											id='changePic'
											style={{ display: 'none' }}
											type='file'
											onChange={fileSelector}
										/>
									</div>
								) : pic.progress > 0 ? (
									<div>
										<progress min='1' max='100'>
											{' '}
											{pic.progress}
										</progress>
									</div>
								) : null}
								<span className='image-upload-bar'>
									{pic.newImage ? (
										<span>
											<div style={{ padding: '4px 15px' }}>
												{basicUserInfo.displayName}
											</div>
											<span
												style={{
													paddingLeft: '15px',
													paddingRight: '15px'
												}}>
												<FontAwesomeIcon
													icon={faCheckCircle}
													size={'1x'}
													color={'white'}
												/>{' '}
												<span onClick={updatePic} className='submit-button'>
													Upload
												</span>
											</span>
										</span>
									) : null}
								</span>
							</div>
						</div>
						<div className='details-block'>
							<div className='profile-details'>
								<form>
									<div className='profile-detail-item'>
										<span className='profile-detail-key-font'>Work </span>
										<div className='profile-edit-detail-value-font'>
											{basicUserInfo.work}
											<br />
											<input
												className='input-field'
												onChange={handleWork}
												type='text'
												name='work'
												placeholder='update work here'
											/>
										</div>
									</div>
									<div className='profile-detail-item'>
										<span className='profile-detail-key-font'>Location </span>
										<div className='profile-edit-detail-value-font'>
											{basicUserInfo.location}
											<br />

											<input
												className='input-field'
												onChange={handleLocation}
												type='text'
												name='location'
												placeholder='update location here'
											/>
										</div>
									</div>
									<div className='profile-detail-item'>
										<span className='profile-detail-key-font'>Bio: </span>

										<div className='profile-edit-detail-value-font'>
											{basicUserInfo.bio}
											<br />
											<input
												className='input-field'
												onChange={handleBio}
												type='text'
												name='bio'
												placeholder='update bio here'
											/>
										</div>
									</div>
									<div className='profile-detail-item'>
										<span className='profile-detail-key-font'>Hobbies:</span>

										<div className='profile-edit-detail-value-font'>
											{basicUserInfo.hobbies}
											<br />
											<input
												className='input-field'
												onChange={handleHobbies}
												type='text'
												name='hobbies'
												placeholder='update hobbies here'
											/>
										</div>
									</div>
								</form>
								<button
									onClick={() => history.push('/feed')}
									className='nav-button'>
									Back
								</button>

								<button className='nav-button' onClick={handleProfileUpdate}>
									Submit
								</button>
							</div>
						</div>
						<div className='pul-tab' onClick={expandDeleteSideDrawerHandler}>
							{expandDeleteSideDrawer ? (
								<Fragment>
									<div className='delete-notice'>
										You can delete all posts, comments and likes from Touchbase
										by clicking the button below. Your account will remain
										active, however, for three days at which time it will be
										automatically deleted from the database. This gives you a
										window of reconsideration, as we hope you will come back and
										join us.
									</div>
									<button
										style={{ marginTop: '30px' }}
										className='nav-button'
										onClick={() => {
											history.push('/')
											dispatch(deleteAllUserRelatedInfo())
											localStorage.clear()
										}}>
										Delete
									</button>
								</Fragment>
							) : (
								<Fragment>
									<FontAwesomeIcon
										icon={faCheckCircle}
										size={'sm'}
										color={'red'}
									/>
									<div
										style={{
											fontSize: '6px',
											color: 'red',
											paddingLeft: '5px',
											alignSelf: 'top'
										}}>
										Delete All Data
									</div>
								</Fragment>
							)}
						</div>
					</section>
				</div>
			) : null}
		</div>
	)
}
export default PersonalProfileEdit
