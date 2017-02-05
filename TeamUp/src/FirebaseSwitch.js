import React, { Component } from 'react';
import firebase from 'firebase';
import { Switch } from 'react-native-router-flux';

class FirebaseSwitch extends Component {
	state = {
		signedIn: null
	};

	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			console.log(user);
			if (user) {
				this.setState({ signedIn: true });
			} else {
				this.setState({ signedIn: false });
			}
		});
	}

	render() {
		return <Switch signedIn={this.state.signedIn} {...this.props} />;
	}
}

export default FirebaseSwitch;
