import React from 'react';
import './Navbar.scss';
import { Link, useHistory } from 'react-router-dom';
import SignOutButton from './SignOutButton/SignOutButton';
import {useSelector} from 'react-redux'
import {auth, db} from '../Firebase/firebaseConfig'

//dispatch = useDispatch();
//



const Navbar = () => {
	
	// TODO add reducer for getting user.uid
	const history = useHistory();
	const navIcon = require('../../Assets/nav.png');


const pushToProfile=(e)=>{
	e.preventDefault();
	console.log(auth.currentUser.uid);
	history.push(`/edit_personal_profile/${auth.currentUser.uid}`)
}




	return (
		<div className='navbar'>
			<div className='image-container'>
				<Link to='/'>
					<img src={navIcon} alt={'nav-icon'} className='nav-icon-image' />
				</Link> 
			</div>

			<div className='nav-icon-bar'>
				{/* <Link to= `/edit_personal_profile/signedInUserId`> */}
					<button className='nav-button' onClick={pushToProfile}>Profile</button>
				{/* </Link> */}
				<Link to='/feed'>
					<button className='nav-button'>Feed</button>
				</Link>

				<SignOutButton />
			</div>
		</div>
	);
};
export default Navbar;
