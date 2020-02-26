import React, { useState } from 'react';
import '../NotIdentifiedScreen.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { db, auth, storage } from '../../Firebase/firebaseConfig';
import { useParams, useHistory } from 'react-router-dom';

const CreateInfo = () => {
	const defaultPic = require('../../../Assets/default.png');
	const param = useParams().id;
	const history = useHistory();

	//move to initial state of editProfile Reducer
	const [ pic, setPic ] = useState({
		image: null,
		url: '',
		progress: 0,
		name: ''
	});

	const [ moreInfo, setMoreInfo ] = useState('');

	//move to action creator
	const fileSelector = (e) => {
		console.log(e.target.files[0]);
		if (e.target.files[0]) {
			setPic({ ...pic, image: e.target.files[0], name: e.target.files[0].name });
		}
	};
	console.log('after first select file', pic.name);

	//move to action creator
	const uploadPic = async () => {
		if (pic.image) {
			console.log('upload Pic Fx fired');
			const uploadImage = storage.ref(`images/${pic.name}`).put(pic.image);
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
				async () => {
					await storage
						.ref('images')
						.child(pic.name)
						.getDownloadURL()
						.then((url) => {
							console.log('url to file', url);
							setPic({ ...pic, url: url });
							db.collection('users').doc(param).update({
								url: url,
								displayName: moreInfo
							});
						})
						.then(() => {
							'sent successfully';
						})
						.catch((err) => console.log(err));
				}
			);
		}
	};

	// TODO get user id here & attach this url to more user data doc

	const displayNameChose = (e) => {
		setMoreInfo(e.target.value);
	};

	const submit = () => {
		history.push('/feed');
	};

	console.log('param: ', param, 'url: ', pic.url, 'displayName: ', moreInfo);

	return (
		<div className='create-account-module'>
			<div className='inner-account-parent'>
				<div className='outer-text'>
					<div className='sign-title'>A few more details</div>
					<form>
						{!moreInfo ? (
							<div>
								<label>Choose a user display name / handle</label>
								<input
									name='displayName'
									className='input-field-sign'
									placeholder='Enter your User Handle'
									type='text'
									onBlur={displayNameChose}
									autoFocus
								/>{' '}
							</div>
						) : (
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
												<button type='button' onClick={uploadPic}>
													upLoad
												</button>
												{/* <span style={{ paddingLeft: '15px' }}>
												
												<FontAwesomeIcon
													icon={faCheckCircle}
													size={'1x'}
													color={'white'}
													onClick={uploadPic}
												/>{' '}
											</span> */}
											</span>
										) : (
											'Change Picture'
										)}
									</span>
								</div>
							</div>
						)}

						<br />
						<br />
						<br />
						<br />

						<button
							disable={!pic.url? true : false}
							onClick={submit}
							style={!pic.url ? { opacity: '0.1' } : { opacity: '1' }}>
							I'm Ready
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
export default CreateInfo;
