import React from 'react';
import '../CreateAccount.scss';

const SignInDumb = (props) => {
	return (
		<div className='create-account-module'>
			<div className='inner-account-parent'>
				<div className='outer-text'>
					<div className='sign-title'>
						<span style={{ color: 'rgb(40,154,189)' }}>
							Sign-in to{' '}
						</span>Touchbase{' '}
					</div>
				</div>
				<form>
					{' '}
					<input
						className='input-field-sign'
						placeholder='Enter your Email Here'
						type='text'
						onChange={props.userEmailEntered}
						onBlur={props.userEmailEntered}
						autoFocus
					/>{' '}
					<input
						className='input-field-sign'
						placeholder='Enter a Password Here'
						type='password'
						onChange={props.userPasswordEntered}
						autoComplete='true'
					/>{' '}
				</form>

				<button
					className='submit-button'
					onClick={props.userInfoEntered}
					style={
						props.password && props.email ? (
							{ opacity: '1' }
						) : (
							{ opacity: '.4' }
						)
					}
					disabled={props.password && props.email ? false : true}>
					Sign In
				</button>
				<div>
					<h5 style={{ color: 'aquaMarine' }}>
						{props.error ? (
							'Either password or email are invalid. Please re-enter your information.'
						) : null}
					</h5>
				</div>
			</div>
		</div>
	);
};

export default SignInDumb;
