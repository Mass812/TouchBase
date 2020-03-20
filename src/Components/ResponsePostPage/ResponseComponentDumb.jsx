import React from 'react'

import '../Feed/TouchBaseCard/TouchBaseCard.scss'

const PostComponentDumb = (props) => {
	return (
		<div className='edge-case-large'>
			<div className='original-sticky'>{props.held}</div>
			<div className='tb-card-container'>
				<div className='tb-posting-title'>
					<span>
						<span style={{ color: 'teal' }}>Touch {''}</span>
						Base with{' '}
						<span style={{ color: 'darkBlue' }}>{props.held.displayName}</span>
					</span>
				</div>
			</div>

			<div className='previous-comments-block'>{props.hero}</div>
		</div>
	)
}
export default PostComponentDumb
