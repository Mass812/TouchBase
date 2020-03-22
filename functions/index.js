const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

exports.createUserDoc = functions.auth.user().onCreate((user) => {
	//...

	const newUser = {
		email: user.email,
		userId: user.uid,
		url: '',
		displayName: '',
		work: 'Edit Work',
		location: 'Edit Location',
		hobbies: 'Edit Hobbies',
		bio: 'Edit Bio.'
	}

	db.collection('users').doc(user.uid).set(newUser)
})
