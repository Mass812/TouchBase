import React from 'react';
import '../CreateAccount.scss';
import {useHistory} from 'react-router-dom'

const Signup = (props) => {
	const history = useHistory();
	return (
		<div className='create-account-module'>
			<div className='inner-account-parent'>
				<div className='outer-text'>
					<div className='sign-title'>Sign Up </div>
					<div className='password-rq'>
						** Passwords must contain: at least one capital Letter, one
						special character and at least one number.{' '}
						<span className='pw-help-message'>{props.helpNotification}</span>
					</div>
				</div>
				<form>
					{' '}
					<input
						name='email'
						className='input-field-sign'
						placeholder='Enter your Email Here'
						type='text'
						onChange={props.userEmailEntered}
						autoFocus
					/>{' '}
					<input
						className='input-field-sign'
						placeholder='Enter a Password Here'
						type='password'
						onChange={props.fireOffTheseRockets}
						autoComplete='true'
					/>{' '}
					<input
						name='password'
						className='input-field-sign'
						placeholder='Confirm Password Here'
						type='password'
						onChange={props.userPasswordConfirmed}
						autoComplete='true'
					/>{' '}

				</form>

				<button
					className='submit-button'
					onClick={props.userInfoEntered}
					style={
						props.password &&
						props.email &&
						props.verPassword  ? (
							{ opacity: '1' }
						) : (
							{ opacity: '.4' }
						)
					}
					disabled={
						props.password &&
						props.email &&
						props.verPassword  ? (
							false
						) : (
							true
						)
					}>
					Create My Account
				</button>
				<div className='error-message'>{props.errorMessage}</div>
			</div>
			<button onClick={()=>history.push('/')} className='nav-button'>
					Back
				</button>

		</div>
	);
};

export default Signup;
