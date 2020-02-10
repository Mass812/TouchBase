import React from 'react';
import './NotIdentifiedScreen.scss';
import { Link } from 'react-router-dom';

const NotIdentifiedScreen = () => {
	const logo = require('../../Assets/touchbase_logo2.png');
	return (
		<div className='not-identified-container'>
			<div>
				<div className='not-identified-title'>TouchBase</div>
				<span className='not-identified-subtitle'>
					A Social Networking Platform
				</span>
			</div>

			<div className='sign-options-logo'>
				<img src={logo} alt={'TouchBase Logo'} className='home-logo' />
			</div>

			<div className='options-button-splay'>
				<Link to='/sign_in'>
					<button className='not-identifiable-screen-button'>Sign In</button>
				</Link>
				<Link to='/sign_up'>
					<button className='not-identifiable-screen-button'>New User</button>
				</Link>
			</div>
			<Link to='/feed'>
				<p style={{ color: 'white' }}>Skip Login</p>
			</Link>
		</div>
	);
};
export default NotIdentifiedScreen;
