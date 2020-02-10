import React from 'react';
import './PostingBody.scss';
import '../TouchBaseCard/TouchBaseCard.scss';
import TouchBaseCard from '../TouchBaseCard/TouchBaseCard';

const PostingBody = (props) => {
	const defaultImage = require('../../Assets/default.png');
	const array = [
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et. Amet purus gravida quis blandit turpis. Laoreet id donec ultrices tincidunt arcu. Morbi non arcu risus quis. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Enim praesent elementum facilisis leo vel fringilla. Nunc scelerisque viverra mauris in. Auctor eu augue ut lectus arcu bibendum at varius vel. Curabitur gravida arcu ac tortor dignissim. Fermentum iaculis eu non diam phasellus vestibulum.',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et. ',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et. Amet purus gravida quis blandit turpis. Laoreet id donec ultrices tincidunt arcu. Morbi non arcu risus quis. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Enim praesent elementum facilisis leo vel fringilla. ',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et. Amet purus gravida quis blandit turpis. Laoreet id donec ultrices tincidunt arcu. Morbi non arcu risus quis. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Enim praesent elementum facilisis leo vel fringilla. Nunc scelerisque viverra mauris in. Auctor eu augue ut lectus arcu bibendum at varius vel. Curabitur gravida arcu ac tortor dignissim. Fermentum iaculis eu non diam phasellus vestibulum.',

		'Lectus magna fringilla urna porttitor rhoncus dolor. Non diam phasellus vestibulum lorem. Arcu v',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et. Amet purus gravida quis blandit turpis. Laoreet id donec ultrices tincidunt arcu. Morbi non arcu risus quis. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Enim praesent elementum facilisis leo vel fringilla. Nunc scelerisque viverra mauris in. Auctor eu augue ut lectus arcu bibendum at varius vel. Curabitur gravida arcu ac tortor dignissim. Fermentum iaculis eu non diam phasellus vestibulum.',

		'Lectus magna fringilla urna porttitor rhoncus dolor. Non diam phasellus vestibulum lorem. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Ornare lectus sit amet est. Viverra accumsan in nisl nisi scelerisque eu. Est placerat in egestas erat imperdiet sed euismod nisi. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam. In est ante in nibh mauris cursus mattis molestie a. Tristique senectus et netus et malesuada fames ac. Nullam ac tortor vitae purus faucibus ornare suspendisse. Neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Arcu cursus vitae congue mauris.',

		'Amet porttitor eget dolor morbi non arcu risus quis varius. Et netus et malesuada fames ac turpis egestas. Consectetur a erat nam at. Consequat id porta nibh venenatis cras sed. Mi quis hendrerit dolor magna. Et odio pellentesque diam volutpat commodo. Ipsum dolor sit amet consectetur adipiscing elit. In ante metus dictum at. Interdum consectetur libero id faucibus nisl. Aliquet porttitor lacus luctus accumsan. Turpis in eu mi bibendum.',
		'nisi scelerisque eu. Est placerat in egestas erat imperdiet sed euismod nisi. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam. In est ante in nibh mauris cursus mattis molestie a. Tristique senectus et netus et malesuada'
	];


const hero= array.map((n, idx)=><TouchBaseCard condition={n}/>)



	return (
		<div className='edge-case-large'>
			<div className='tb-card-container'>
				<div className='tb-posting-title'>
					<span>TouchBase with Others</span>
				</div>
				{/* dummy data Dynamic when served*/}
				<div className='tb-card-original-post'>
					<div className='postingPicture'>
						<img
							src={defaultImage}
							alt={'default logo'}
							className='default-user-image'
						/>
					</div>
					<div className='postersName'> Posting Author / User Here </div>

					<div className='originalPosting'>
						What is going on in Russia right now? Vladimir Lenin would roll
						over in his grave if his body and mind were still intact{' '}
					</div>
					<div className='like-span'>Like heart Icons</div>
				</div>

				<div className='post-comments-container'>
					<TouchBaseCard condition={props.storedUserComment} />
				</div>

				{/* dummy data */}

				<div className='response-input-container'>
					<div>
						<div className='typed-post'> {props.responsePost} </div>

						<div className='comment-on-post'>
							<input
								className='input-field-posts'
								placeholder='Enter a new post here'
								type='textArea'
								onChange={props.responseMainPost}
								onBlur={props.storeThisResponsePost}
							/>
						</div>
						<div className='post-comment-button'>
							<button
								onClick={props.storeThisResponsePost}
								className='nav-button'>
								Post
							</button>
						</div>
					</div>
					{/* dudelete mmy data */}
				</div>
				<div className='previous-comments-block'>
					{hero}
				</div>
			</div>
		</div>
	);
};
export default PostingBody;
