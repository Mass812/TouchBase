import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faTrash,
	faComment,
	faBriefcase,
	faEdit,
	faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons'
import '../../../App.scss'
import firebase from '../../Firebase/firebaseConfig'

//TODO GSAP NOTIFICATION


const UserNotificationGem = (props) => {
	
	const [notifications, setNotifications] = useState(false)
	
	useEffect(() => {
		console.log('Notification UseEffect Fired');
		return () => {
			console.log('Notification UseEffect unsubscribed');
		};
	}, [])




	return (
		<div>
		{notifications ?
(<div className='UserNotificationGem-parent'>
			<FontAwesomeIcon icon={faComment} className='UserNotificationGem' />
			<span className='notification text'>
			{props.children} {''} User responded to your Post
			</span>
		</div>) : null
		}
		</div>
	)
}
export default UserNotificationGem
