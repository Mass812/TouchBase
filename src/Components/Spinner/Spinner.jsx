import React from 'react';
import './Spinner.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const Spinner = () => {
	return (

		<div className='spinner-container'>
			<FontAwesomeIcon style={{color: 'lightBlue'}} icon={faSpinner} size={'4x'} color={'white'} spin />
		<div>Loading Content</div>
		</div>
	);
};
export default Spinner;
