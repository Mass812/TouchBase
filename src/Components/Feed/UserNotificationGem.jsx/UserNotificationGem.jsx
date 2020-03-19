import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import '../../../App.scss'
//TODO GSAP NOTIFICATION

const UserNotificationGem = (props) => {
	const [
		notifications,
		setNotifications
	] = useState(false)

	useEffect(() => {
		setNotifications(false)
	}, [])

	return (
		<div>
			{notifications ? (
				<div className='UserNotificationGem-parent'>
					<FontAwesomeIcon icon={faComment} className='UserNotificationGem' />
					<span className='notification text'>
						{props.children} {''} User responded to your Post
						{'notification[0]'}
					</span>
				</div>
			) : null}
		</div>
	)
}
export default UserNotificationGem
