import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faTrash,
	faComment,
	faBriefcase,
	faEdit,
	faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons'
import '../../../App.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications, getBasicUserDetails } from '../../../redux/actions/profileActions'
//TODO GSAP NOTIFICATION

const UserNotificationGem = (props) => {
	const dispatch = useDispatch()
	const notification = useSelector((state) => state.profile.getNotifications)
	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)
	const [
		notifications,
		setNotifications
	] = useState(false)




	useEffect(() => {
	//	dispatch(getBasicUserDetails())
		setNotifications(false)
	//	dispatch(getNotifications(basicUserInfo.userId))
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
