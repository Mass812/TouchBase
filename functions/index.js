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
		work: 'No Details',
		location: 'No Details',
		hobbies: 'No Details',
		bio: 'No Details.'
	}

	db.collection('users').doc(user.uid).set(newUser)
})
