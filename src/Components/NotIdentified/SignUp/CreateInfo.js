import React, { useState, useEffect } from 'react';
import '../NotIdentifiedScreen.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCloudUploadAlt,
	faCheckCircle,
	faInfo
} from '@fortawesome/free-solid-svg-icons';
import firebase, { db, auth } from '../../Firebase/firebaseConfig';

const CreateInfo = () => {
	const defaultPic = require('../../../Assets/default.png');
	//move to initial state of editProfile Reducer
	const [ pic, setPic ] = useState({
		image: null,
		url: '',
		progress: 0,
		name: ''
	});

	const [ moreInfo, setMoreInfo ] = useState({
		url: '',
		displayName: ''
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
	};

	// TODO get user id here & attach this url to more user data doc

	const displayNameChose = (e) => {
		setMoreInfo({ ...moreInfo, displayName: e.target.value });
	};

	const submit = () => {
		db
			.collection('users')
			.doc(auth.getUid())
			.update({
				...moreInfo,
				url: moreInfo.url,
				displayName: moreInfo.displayName
			});
	};

	return (
		<div className='create-account-module'>
			<div className='inner-account-parent'>
				<div className='outer-text'>
					<div className='sign-title'>A few more details</div>
					<form>
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
						<br />
						<br />
						<br />
						<br />
						<label>Choose a user display name / handle</label>
						<input
							name='displayName'
							className='input-field-sign'
							placeholder='Enter your User Handle'
							type='text'
							onChange={displayNameChose}
							onBlur={displayNameChose}
							autoFocus
						/>{' '}
						<button onClick={submit}>I'm Ready</button>
					</form>
				</div>
			</div>
		</div>
	);
};
export default CreateInfo;
