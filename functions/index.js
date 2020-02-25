const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.createUserDoc = functions.auth.user().onCreate((user) => {
	//...
	const newUser = {
		email: user.email,
		userId: user.uid,
		work: '',
		location: '',
		hobbies: ''
	};

	db.collection('users').doc(user.uid).set(newUser);
});

exports.deleteUserDoc = functions.auth.user().onDelete((user) => {
	// ...
	db
		.collection('users')
		.doc(user)
		.delete()
		.then(() => console.log(user, ' successfully deleted'))
		.catch((err) => console.error(err, 'error occurred'));
});
