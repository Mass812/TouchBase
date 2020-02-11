import React from 'react';
import './PersonalProfile.scss';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMapMarkerAlt,
	faBriefcase
} from '@fortawesome/free-solid-svg-icons';

const PersonalProfile = () => {
	const defaultPic = require('../../Assets/default.png');
	return (
		<div>
			<Navbar />
			<div className='edge-case-large'>
				<section className='profile-container'>
					<div >
						<div>
							<img
								className='profile-image'
								src={defaultPic}
								alt={'default'}
							/>
						</div>
						<div className='under-icon-pair-group'>
							<FontAwesomeIcon
								icon={faBriefcase}
								size={'sm'}
								color={'brown'}
							/>{' '}
							<span className='image-upload-bar'>Work</span>
						</div>
						<div className='under-icon-pair-group'>
							<FontAwesomeIcon
								icon={faMapMarkerAlt}
								size={'sm'}
								color={'darkGreen'}
							/>{' '}
							<span className='image-upload-bar'>Location</span>
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
export default PersonalProfile;
