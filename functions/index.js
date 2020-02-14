const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyDHlsU9uEhKXq54jYoqUgGRRrfq_8hU8jg",
    authDomain: "touch-base-29dce.firebaseapp.com",
    databaseURL: "https://touch-base-29dce.firebaseio.com",
    projectId: "touch-base-29dce",
    storageBucket: "touch-base-29dce.appspot.com",
    messagingSenderId: "882401272738",
    appId: "1:882401272738:web:90fa8846bafb52872408fb",
    measurementId: "G-GKPXH82WR5"
  };

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();
const app = require('express')();

exports.signUp = functions.https.onRequest((req, res)=>{

const newUser = {
    email: req.body.email,
    password: req.body.password,
    userHandle: req.body.userHandle
}

let token, userId;

db.doc(`/users/${newUser.userHandle}`)
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
    
});
});




exports.api = functions.https.onRequest(app);
