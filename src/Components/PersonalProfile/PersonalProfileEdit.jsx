import React from 'react';
import './PersonalProfile.scss';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCloudUploadAlt,

} from '@fortawesome/free-solid-svg-icons';

const PersonalProfileEdit = () => {
	const defaultPic = require('../../Assets/default.png');
	return (
		<div>
			<Navbar />
			<div className='edge-case-large'>
				<section className='profile-container'>
					<div>
						<div>
							<img
								className='profile-image'
								src={defaultPic}
								alt={'default'}
							/>
						</div>
						<div className='under-icon-pair-group'>

						<FontAwesomeIcon icon={faCloudUploadAlt} size={'1x'} />{' '}
						<span className='image-upload-bar'>Change Picture</span>
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
