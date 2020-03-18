import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import './Help.scss'

const Help = () => {
	const history = useHistory()
	const helpImage = require('../../Assets/TouchBaseHelp.PNG')
	const helpnput = require('../../Assets/TouchBaseHelpInput.PNG')
	console.log('hit')

	return (
        <Fragment>
			<NavBar />

		<div className='help-parent'>
			<div>
				<div className='help-title'>Welcome to TouchBase</div>
			</div>
				<div className='help-subtitle'>Creating a Post</div>
			<img src={helpnput} alt={helpImage} className='help-image' />
				<div className='help-subtitle'>Once your Post is Created</div>
			<img src={helpImage} alt={helpImage} className='help-image' />
			<button className='nav-button' 
                    onClick={() => history.push('/feed')}
                    style={{justifySelf: 'center', alignSelf: 'center', padding: '5px 15px'}}
                    >
				Back to Feed
			</button>
		</div>
        </Fragment>
	)
}
export default Help
