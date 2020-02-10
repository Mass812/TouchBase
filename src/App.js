import React from 'react';
import './index.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import SpecificPost from './Components/SpecificPost/SpecificPost';
import Posting from './Components/Posting/Posting';
import SignIn from './Components/AuthSignUpOrInComponents/SignIn/SignIn';
import SignUp from './Components/AuthSignUpOrInComponents/SignUp/CreateAccount';
import NotIdentifiedScreen from './Components/NotIdentified/NotIdentifiedScreen';
import Feed from './Components/Feed/Feed';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact={true} component={NotIdentifiedScreen} />
				<Route path='/specific_post' component={SpecificPost} />
				<Route path='/sign_in'  component={SignIn} />
				<Route path='/sign_up'  component={SignUp} />
				<Route path='/feed'  component={Feed} />
			</Switch>
		</Router>
	);
}

export default App;
