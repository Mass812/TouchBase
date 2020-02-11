import React from 'react';
import './PersonalProfile.scss';
import Navbar from '../Navbar/Navbar';

const PersonalProfile = () => {
	const defaultPic = require('../../Assets/default.png');
	return (
		<div>
			<Navbar />
			<div className='profile-container'>
				<div ClassName='profile-image-block'>
                <div>

					<img className='profile-image' src={defaultPic} alt={'default'} />
                </div>
					<span className='image-upload-bar'>Upload bar</span>
				</div>
				<div className='details-block'>
					<div className='profile-details'>City, Work, userHandle</div>
					<div className='more-details'>
						Hobbies, Interests, Goals, Job, Favorite Things
					</div>
				</div>
			</div>
		</div>
	);
};
export default PersonalProfile;
