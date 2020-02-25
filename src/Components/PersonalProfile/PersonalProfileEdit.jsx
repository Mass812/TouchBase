import React, { useState } from 'react';
import './PersonalProfile.scss';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import firebase, { db } from '../Firebase/firebaseConfig';
const PersonalProfileEdit = () => {
	const defaultPic = require('../../Assets/default.png');
	//move to initial state of editProfile Reducer
	const [ pic, setPic ] = useState({
		image: null,
		url: '',
		progress: 0,
		name: ''
	});

	//move to action creator
	const fileSelector = (e) => {
		console.log(e.target.files[0]);
		if (e.target.files[0]) {
			setPic({ ...pic, image: e.target.files[0], name: e.target.files[0].name });
		}
	};
	console.log('after first select file', pic.name);

	//move to action creator
	const uploadPic = () => {
		if (pic.image) {
			console.log('upload Pic Fx fired');
			const storageRef = firebase.storage();
			const uploadImage = storageRef.ref(`images/${pic.name}`).put(pic.image);
			uploadImage.on(
				'state_changed',
				(snapshot) => {
					const progressBar = Math.round(
						snapshot.bytesTransferred / snapshot.totalBytes * 100
					);
					console.log(pic.progress);
					setPic({ ...pic, progress: progressBar });
				},
				(error) => {
					console.log('Error uploading photo', error);
				},
				() => {
					storageRef
						.ref('images')
						.child(pic.name)
						.getDownloadURL()
						.then((url) => {
							setPic({ ...pic, url: url });
						});
				}
			);
		}
		// TODO get user id here & attach this url to more user data doc
	};

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
								src={`${pic.url}` || defaultPic}
								alt={'default'}
							/>
						</div>
						<div className='under-icon-pair-group'>
							{!pic.name ? (
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
								{pic.name ? (
									<span>
										{pic.name}
										<span style={{ paddingLeft: '15px' }}>
											<FontAwesomeIcon
												icon={faCheckCircle}
												size={'1x'}
												color={'white'}
												onClick={uploadPic}
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
								<span className='profile-detail-key-font'>Hobbies:</span>
								<blockquote className='profile-detail-value-font'>
									hiking, typing, diking, clondiking
								</blockquote>
							</div>
							<div className='profile-detail-item'>
								<span className='profile-detail-key-font'>Hobbies:</span>
								<blockquote className='profile-detail-value-font'>
									hiking, typing, diking, clondiking
								</blockquote>
							</div>
							<div className='profile-detail-item'>
								<span className='profile-detail-key-font'>Hobbies:</span>
								<blockquote className='profile-detail-value-font'>
									hiking, typing, diking, clondiking
								</blockquote>
							</div>
							<div className='profile-detail-item'>
								<span className='profile-detail-key-font'>Hobbies:</span>
								<blockquote className='profile-detail-value-font'>
									hiking, typing, diking, clondiking
								</blockquote>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};
export default PersonalProfileEdit;
