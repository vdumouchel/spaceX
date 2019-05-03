// basic react imports
import React from 'react';
import ReactDOM from 'react-dom';
// advanced module imports
import { ApolloProvider } from 'react-apollo';
import apolloClient from './apolloclient';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './modules/store';

// css & styles
import './index.css';
// components imports
import { Routes } from './routes';

//declare initial state of entire App
let initial_state = {
	user_username: 'test',
	user_email: 'test@test.com',
	user_id: 3,
};

const reduxStore = configureStore(initial_state);

ReactDOM.render(
	<ReduxProvider store={reduxStore}>
		<ApolloProvider client={apolloClient}>
			<Router>
				<Routes />
			</Router>
		</ApolloProvider>
	</ReduxProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
