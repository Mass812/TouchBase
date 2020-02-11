import React from 'react';
import './index.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Posting from './Components/Posting/Posting';
import SignIn from './Components/AuthSignUpOrInComponents/SignIn/SignIn';
import SignUp from './Components/AuthSignUpOrInComponents/SignUp/CreateAccount';
import NotIdentifiedScreen from './Components/NotIdentified/NotIdentifiedScreen';
import Feed from './Components/Feed/Feed';
import PersonalProfile from './Components/PersonalProfile/PersonalProfile';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact={true} component={NotIdentifiedScreen} />
				<Route path='/sign_in' component={SignIn} />
				<Route path='/sign_up' component={SignUp} />
				<Route path='/feed' component={Feed} />
				<Route path='/specific_post' component={Posting} />
				<Route path='/personal_profile' component={PersonalProfile} />
			</Switch>
		</Router>
	);
}

export default App;
