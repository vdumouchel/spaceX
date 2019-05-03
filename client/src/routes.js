// basic react imports
import React from 'react';
// Advanced module imports
import { Route, Switch, Redirect } from 'react-router-dom';
//css & styling imports
import './App.css';
// component imports
import landing from './components/pages/landingpage/landing';
import signup from './components/pages/signup/signup';
import login from './components/pages/login/login';
import app from './components/pages/App/app/app';
import nomatch from './components/pages/nomatch/nomatch';

export const Routes = () => {
	return (
		<div>
			<Switch>
				<Route exact path="/landing" component={landing} />
				<Route exact path="/">
					<Redirect to="/landing" />
				</Route>
				<Route exact path="/signup" component={signup} />
				<Route exact path="/login" component={login} />
				<Route exact path="/app" component={app} />

				<Route component={nomatch} />
			</Switch>
		</div>
	);
};
