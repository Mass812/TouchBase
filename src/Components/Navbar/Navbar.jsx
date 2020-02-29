import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton/SignOutButton';
//dispatch = useDispatch();
//




const Navbar = (props) => {

// TODO add reducer for getting user.uid






	const navIcon = require('../../Assets/nav.png');
	return (
		<div className='navbar'>
			<div className='image-container'>
				<Link to='/'>
					<img src={navIcon} alt={'nav-icon'} className='nav-icon-image' />
				</Link> 
			</div>

			<div className='nav-icon-bar'>
				<Link to='/personal_profile'>
					<button className='nav-button'>Profile</button>
				</Link>
				<Link to='/feed'>
					<button className='nav-button'>Feed</button>
				</Link>

				<SignOutButton />
			</div>
		</div>
	);
};
export default Navbar;
