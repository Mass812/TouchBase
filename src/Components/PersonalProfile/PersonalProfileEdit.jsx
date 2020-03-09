import React, { useState, useEffect } from 'react'
import './PersonalProfile.scss'
import Navbar from '../Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import firebase, { auth, db } from '../Firebase/firebaseConfig'
import { updateAndReturnUserProfile, getBasicUserDetails } from '../../redux/actions/profileActions'
import { getCurrentUserByAuth } from '../../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import '../../App.scss'
import { useParams, useHistory } from 'react-router-dom'


const PersonalProfileEdit = () => {

	const dispatch = useDispatch()

	const history = useHistory()

	const [
		completed,
		setCompleted
	] = useState(false)
	//move to initial state of editProfile Reducer
	useEffect(() => {
		dispatch(getCurrentUserByAuth())
		dispatch(getBasicUserDetails())
	}, [])

	//userProfile data from page user

	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)

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
			<div className='edge-case-large'>
				<section className='profile-container'>
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
								<span>
									<label htmlFor='changePic'>
										<FontAwesomeIcon
											icon={faCloudUploadAlt}
											size={'1x'}
											color={'white'}
											onClick={updatePic}
										/>{' '}
									</label>

									<input
										className='input-field'
										id='changePic'
										style={{ display: 'none' }}
										type='file'
										onChange={fileSelector}
									/>
								</span>
							) : pic.progress > 0 ? (
								<div>
									<progress min='1' max='100'>
										{pic.progress}
									</progress>
								</div>
							) : null}
							<span className='image-upload-bar'>
								{pic.newImage ? (
									<span>
										<span style={{ paddingLeft: '15px' }}>
											<FontAwesomeIcon
												icon={faCheckCircle}
												size={'1x'}
												color={'white'}
											/>{' '}
											<button onClick={updatePic} className='submit-button'>
												Preview Selected File
											</button>
										</span>
										<div />
									</span>
								) : (
									'Change Picture'
								)}
							</span>
						</div>
					</div>
					<div className='details-block'>
						<div className='profile-details'>
							<form>
								<div className='profile-detail-item'>
									<span className='profile-detail-key-font'>Work </span>
									<div className='profile-edit-detail-value-font'>
										<div>{basicUserInfo.work} </div>
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
										<div> {basicUserInfo.location} </div>
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
										<div> {basicUserInfo.bio} </div>
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
										<div> {basicUserInfo.hobbies} </div>
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
							<button onClick={() => history.push('/feed')} className='submit-button'>
								Back
							</button>

							<button className='submit-button' onClick={handleProfileUpdate}>
								Submit
							</button>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}
export default PersonalProfileEdit
