import React from 'react';
import '../CreateAccount.scss';

const Signup = (props) => {
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
						className='input-field'
						placeholder='Enter your Email Here'
						type='text'
						onChange={props.userEmailEntered}
						autoFocus
					/>{' '}
					<input
						className='input-field'
						placeholder='Enter a Password Here'
						type='password'
						onChange={props.fireOffTheseRockets}
						autoComplete='true'
					/>{' '}
					<input
						className='input-field'
						placeholder='Confirm Password Here'
						type='password'
						onChange={props.userPasswordConfirmed}
						autoComplete='true'
					/>{' '}
					<input
						className='input-field'
						placeholder='Enter your User Handle'
						type='text'
						onChange={props.userHandleChose}
						autoFocus
					/>{' '}
				</form>

				<button
					className='submit-button'
					onClick={props.userInfoEntered}
					style={
						props.password &&
						props.email &&
						props.verPassword &&
						props.userHandle ? (
							{ opacity: '1' }
						) : (
							{ opacity: '.4' }
						)
					}
					disabled={
						props.password &&
						props.email &&
						props.verPassword &&
						props.useHandle ? (
							false
						) : (
							true
						)
					}>
					Create My Account
				</button>
				<div className='error-message'>{props.errorMessage}</div>
			</div>
			<div className='error-message'>{props.errorIfFail}</div>
		</div>
	);
};

export default Signup;
