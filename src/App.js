import React from 'react';
import './index.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import SignIn from './Components/NotIdentified/SignIn/SignIn';
import SignUp from './Components/NotIdentified/SignUp/CreateAccount';
import Response from './Components/ResponsePostPage/ResponseComponent';
import NotIdentifiedScreen from './Components/NotIdentified/NotIdentifiedScreen';
import Feed from './Components/Feed/Feed';
import PersonalProfile from './Components/PersonalProfile/PersonalProfile';
import PersonalProfileEdit from './Components/PersonalProfile/PersonalProfileEdit';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import CreateInfo from './Components/NotIdentified/SignUp/CreateInfo';
function App() {
	return (
		<Router>
			<ScrollToTop />
			<Switch>
				<Route path='/' exact={true} component={NotIdentifiedScreen} />
				<Route path='/sign_in' component={SignIn} />
				<Route path='/sign_up' component={SignUp} />
				<Route path='/sign_up_more_info' component={CreateInfo} />
				<Route path='/feed' component={Feed} />
				<Route path='/specific_post/:id' component={Response} />
				<Route path='/personal_profile' component={PersonalProfile} />
				<Route path='/edit_personal_profile' component={PersonalProfileEdit} />
			</Switch>
		</Router>
	);
}

export default App;
