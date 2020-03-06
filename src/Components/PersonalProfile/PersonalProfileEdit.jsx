import React, { useState, useEffect } from 'react'
import './PersonalProfile.scss'
import Navbar from '../Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import firebase, { db } from '../Firebase/firebaseConfig'
import {
	checkForUserProfile,
	getUserDetailsFromId,
	updateUserProfile
} from '../../redux/actions/profileActions'
import { useDispatch, useSelector } from 'react-redux'
import '../../App.scss'
import { useParams, useHistory } from 'react-router-dom'

//TODOS not refeshing after load --maybe redux will

const PersonalProfileEdit = () => {
	const defaultPic = require('../../Assets/default.png')
	const dispatch = useDispatch()
	const param = useParams()
	const history = useHistory()
	//move to initial state of editProfile Reducer

	//userProfile data from page user
	const userProfileInfo = useSelector((state) => state.profile.profile)
	console.log('userProfileInfo', userProfileInfo)

	const userInfo = useSelector((state) => state.profile.data)
	console.log('userProfileInfo', userProfileInfo)

	const [
		newProfileData,
		setNewProfileData
	] = useState({
		work: userProfileInfo.work,
		location: userProfileInfo.location,
		bio: userProfileInfo.bio,
		hobbies: userProfileInfo.hobbies
	})

	const [
		updatedProfile,
		setUpdatedProfile
	] = useState('')

	const handleProfileUpdate = async () => {
		await setUpdatedProfile(newProfileData)
		await dispatch(updateUserProfile(userInfo, newProfileData))
		//use reducer action pair
		console.log(userInfo, ' signedInUser ')
	}
	console.log(newProfileData, 'New Profile Data')
	useEffect(
		() => {
			console.log('refresh by state', updatedProfile)

			// Execute the created function directly
		},
		[
			updatedProfile
		]
	)

	const handleWork = (e) => {
		setNewProfileData({...newProfileData,  work: e.target.value })
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
		newImage: null,
		url: userInfo.url,
		progress: 0,
		name: userInfo.displayName
	})

	//move to action creator
	const fileSelector = (e) => {
		console.log(e.target.files[0])
		if (e.target.files[0]) {
			setPic({ ...pic, newImage: e.target.files[0], name: userInfo.userId })
		}
	}
	console.log('after first select file', pic.name)

	//move to action creator
	const updatePic = () => {
		if (pic.newImage) {
			//args file
			console.log('upload Pic Fx fired')
			const storageRef = firebase.storage()
			const uploadImage = storageRef
				.ref(`images/${userInfo.userId}`) //state.profile.data
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

						let hold = []
						firebase
							.firestore()
							.collection('users')
							.doc(userInfo.userId)
							.update({ url: url })

						firebase
							.firestore()
							.collection('posts')
							.where('userId', '==', userInfo.userId)
							.get()
							.then((n) => {
								n.forEach((n) => hold.push(n.data().id))
								console.log(hold, 'hold bvalue')
							})
							.then(() => {
								console.log(hold)
								hold.map((arrValue) =>
									firebase
										.firestore()
										.collection('posts')
										.doc(arrValue)
										.update({ url: url })
								)
								history.push('/feed')
							})
					})
				}
			)
		}
		// TODO get user id here & attach this url to more user data doc
	}

	// TODO useEffect hook parameter pic.url to update users profile

	//change to dispatch selector props
	return (
		<div>
			<Navbar />
			<div className='edge-case-large'>
				<section className='profile-container'>
					<div>
						<div>
							<img
								className='profile-image'
								src={
									`${userInfo.url}` ? (
										`${userInfo.url}`
									) : `${pic.url}` ? (
										`${pic.url}`
									) : (
										{ defaultPic }
									)
								}
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
										/>{' '}
									</label>

									<input
										id='changePic'
										style={{ display: 'none' }}
										type='file'
										onChange={fileSelector}
									/>
								</span>
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
										{pic.name}
										<span style={{ paddingLeft: '15px' }}>
											<FontAwesomeIcon
												icon={faCheckCircle}
												size={'1x'}
												color={'white'}
												onClick={updatePic}
											/>{' '}
										</span>
									</span>
								) : (
									'Change Picture'
								)}
							</span>
						</div>
					</div>
					<div className='details-block'>
						<div className='profile-details'>
							<div className='profile-detail-item'>
								<span className='profile-detail-key-font'>Work </span>
								<div className='profile-edit-detail-value-font'>
									<div>{userProfileInfo.work} </div>
									<br />
									<input
										className='input-field'
										onChange={handleWork}
										type='textArea'
										name='work'
										placeholder='update work here'
									/>
								</div>
							</div>
							<div className='profile-detail-item'>
								<span className='profile-detail-key-font'>Location </span>
								<div className='profile-edit-detail-value-font'>
									<div> {userProfileInfo.location} </div>
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
									<div> {userProfileInfo.bio} </div>
									<br />
									<input
										className='input-field'
										onChange={handleBio}
										type='textArea'
										name='bio'
										placeholder='update bio here'
									/>
								</div>
							</div>
							<div className='profile-detail-item'>
								<span className='profile-detail-key-font'>Hobbies:</span>

								<div className='profile-edit-detail-value-font'>
									<div> {userProfileInfo.hobbies} </div>
									<br />
									<input
										className='input-field'
										onChange={handleHobbies}
										type='textArea'
										name='hobbies'
										placeholder='update hobbies here'
									/>
								</div>
							</div>
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
