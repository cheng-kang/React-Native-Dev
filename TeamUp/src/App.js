import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

	componentWillMount() {
		// Initialize Firebase
		const config = {
		apiKey: 'AIzaSyCjd0iMMOw7nvR_WcVtMb5fu6ET2--PXig',
		authDomain: 'teamup-9593e.firebaseapp.com',
		databaseURL: 'https://teamup-9593e.firebaseio.com',
		storageBucket: 'teamup-9593e.appspot.com',
		messagingSenderId: '513304247794'
		};
		firebase.initializeApp(config);
	}

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
