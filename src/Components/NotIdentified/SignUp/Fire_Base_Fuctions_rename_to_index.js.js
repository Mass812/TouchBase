const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const firebaseConfig = {
	apiKey: 'AIzaSyCwjhFbyks3PwxHHP2sk4AskiHuxBUMDOI',
	authDomain: 'intouch-da196.firebaseapp.com',
	databaseURL: 'https://intouch-da196.firebaseio.com',
	projectId: 'intouch-da196',
	storageBucket: 'intouch-da196.appspot.com',
	messagingSenderId: '655978097881',
	appId: '1:655978097881:web:e0b39798ad5917e8d962c8'
};

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

//GET Function for whole COLLECTION
exports.get_touchbase = functions.https.onRequest((req, res) => {
	db
		.collection('Touchbase')
		.get()
		.then((res) => {
			let posts = [];
			res.forEach((doc) => {
				posts.push(doc.data());
			});
			return res.json(posts);
		})
		.catch((err) => console.error(err));
});

//Fx for actually creating documents
//note written in Node 8 syntax for exports followed by the https path endpoint
//we call functions from Node by the https method
//onRequest pulls data once amd takes a callback that takes in two args request & response

exports.create_post = functions.https.onRequest((req, res) => {
	//to make sure that we catch the error whereby a fetch request is sent to
	// a this post request we can do this

	if (req.method !== 'POST') {
		return res.status(
			400,
			json({
				error:
					'Method not Allowed: You are attempting to get a GET request from a Post address'
			})
		);
	}

	const newPost = {
		post: req.body.post,
		userHandle: req.body.userHandle,
		createdAt: new Date().toISOString()
	};

	//the object above needs to be persisted through the database
	db
		.collection('Touchbase')
		//add takes an object and adds it in json format to db and gives docId automatically
		.add(newPost)
		//thats it to POST, everything below is Response for user messages & error handling
		.then((doc) => {
			res
				.json({ message: `document ${doc.id} created successfully` })
				.catch((err) => {
					//500 server error if something goes wrong
					res.status(500).json({
						error: 'something went wrong'
					});
					console.error(err);
				});
		});
});

//SignUp Route
exports.sign_up = functions.https.onRequest((req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		userHandle: req.body.userHandle
	};

	//Create User with Email

	let token, userId;

	db
		.doc(`/users/${newUser.userHandle}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return res.status(400).json({
					handle: 'this handle is already taken'
				});
			} else {
				return firebase
					.auth()
					.createUserWithEmailAndPassword(newUser.email, newUser.password);
			}
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idToken) => {
			token = idToken;
			const userCredentials = {
				userHandle: newUser.userHandle,
				email: newUser.email,
				createdAt: new Date().toISOString(),
				userId
			};
			db.doc(`/users/${newUser.userHandle}`).set(userCredentials);
			return token;
		})
		.then((token) => {
			return res.status(201).json({ token });
		})
		.catch((err) => {
			console.error(err);
			if (err.code === 'auth/email-already-in-use') {
				return res.status(400).json({ email: 'Email is already in use' });
			}
			return res.status(500).json({ error: err.code });
		});
});

//Sign In with Email

const isEmpty = (string) => {
	if (string.trim() === '') {
		return true;
	} else {
		return false;
	}
};

exports.login_route = functions.https.onRequest((req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password
	};

	let errors = {};

	if (isEmpty(user.email)) {
		errors.email = 'Field must not be empty';
	}
	if (isEmpty(user.password)) {
		errors.email = 'Field must not be empty';
	}
	if (Object.keys(errors).length > 0) {
		return res.status(400).json(errors);
	}

	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then((data) => {
			return data.user.getIdToken();
		})
		//if token is dead we want to refresh it
		.then((token) => {
			return res.json({ token });
		})
		.catch((err) => {
			console.error(err);
			if (error.code === 'auth/wrong-password') {
				return res.status(403).json({ general: 'Credentials entered are wrong' });
			} else {
				return res.status(500).json({ error: error.code });
			}
		});
});
