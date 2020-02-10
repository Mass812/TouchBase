import React from 'react';
import './Button.scss';

const Button = (props) => {
	return <div className='indent-button'>{props.children}</div>;
};
export default Button;
