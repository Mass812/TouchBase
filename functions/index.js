
// exports.createUser = functions.http.onRequest((req, res) => {
// 	auth.createUserWithEmailAndPassword((email, password) => {}).catch(function(error) {
// 		console.log(error.code, error.message);
// 	});
// });

// exports.signInUser = functions.http.onRequest((email, password) => {
// 	auth.signInWithEmailAndPassword((email, password) => {}).catch(function(error) {
// 		console.log(error);
// 	});
// });

//   Set an authentication state observer and get user data
//   For each of your app's pages that need information about the signed-in user, attach an observer to the global authentication object. This observer gets called whenever the user's sign-in state changes.

//   Attach the observer using the onAuthStateChanged method. When a user successfully signs in, you can get information about the user in the observer.
