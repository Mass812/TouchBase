import React, {useEffect} from 'react'
import './index.css'
import {
	Route,
	Switch,
	BrowserRouter as Router
} from 'react-router-dom'
import SignIn from './Components/NotIdentified/SignIn/SignIn'
import SignUp from './Components/NotIdentified/SignUp/CreateAccount'
import Response from './Components/ResponsePostPage/ResponseComponent'
import NotIdentifiedScreen from './Components/NotIdentified/NotIdentifiedScreen'
import Feed from './Components/Feed/Feed'
import PersonalProfile from './Components/PersonalProfile/PersonalProfile'
import PersonalProfileEdit from './Components/PersonalProfile/PersonalProfileEdit'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import CreateInfo from './Components/NotIdentified/SignUp/CreateInfo'
import {auth} from './Components/Firebase/firebaseConfig'
function App() {



	useEffect(
			() => {
				auth.onAuthStateChanged((user) => {
					console.log('on auth change use effect => ', user)
					if (user) {
					return
					
					} else {
						auth.signOut()
						localStorage.clear()
					}
				})
			},
			[
				
			]
		)


	return (
		<Router>
			<ScrollToTop />
			<Switch>
				<Route
					path='/'
					exact={true}
					component={
						NotIdentifiedScreen
					}
				/>
				<Route
					path='/sign_in'
					component={SignIn}
				/>
				<Route
					path='/sign_up'
					component={SignUp}
				/>
				<Route
					path='/sign_up_more_info/:id'
					component={
						CreateInfo
					}
				/>
				<Route
					path='/feed'
					component={Feed}
				/>
				<Route
				
					path='/specific_post/:id'
					component={Response}
				/>
				<Route
					path='/personal_profile/:id'
					component={
						PersonalProfile
					}
				/>
				<Route
					path='/edit_personal_profile/:id'
					component={
						PersonalProfileEdit
					}
				/>
			</Switch>
		</Router>
	)
}

export default App
