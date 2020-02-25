import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/storage";

const firebaseConfig = {
	apiKey: 'AIzaSyDHlsU9uEhKXq54jYoqUgGRRrfq_8hU8jg',
	authDomain: 'touch-base-29dce.firebaseapp.com',
	databaseURL: 'https://touchbase-29dce.firebaseio.com',
	projectId: 'touch-base-29dce',
	storageBucket: 'touch-base-29dce.appspot.com',
	messagingSenderId: '882401272738',
	appId: '1:882401272738:web:90fa8846bafb52872408fb',
	measurementId: 'G-GKPXH82WR5'
};



firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();




export default firebase;
