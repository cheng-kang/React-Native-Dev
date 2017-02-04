import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import SignInPage from './pages/auth/SignInPage';

const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene key="auth">
				<Scene key="signin" component={SignInPage} title="Sign In" />
			</Scene>
		</Router>
	);
};

export default RouterComponent;
