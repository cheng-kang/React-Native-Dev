import React from 'react';
import { Scene, Router, Switch } from 'react-native-router-flux';
import { connect } from 'react-redux';
import FirebaseSwitch from './FirebaseSwitch';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import MyEventsPage from './pages/event/MyEventsPage';
import EventPage from './pages/event/EventPage';
import EventSquarePage from './pages/event/EventSquarePage';
import LaunchScreen from './pages/LaunchScreen';

// console.log(this.props);
// console.log(props);

const RouterComponent = () => {
	return (
		<Router 
			navigationBarStyle={{ backgroundColor: '#121619' }} 
			titleStyle={{ color: '#fff', fontWeight: 'bold' }} 
		>
			<Scene 
				key="root"
				component={FirebaseSwitch}
				selector={props => props.signedIn == null ? 'launch' : props.signedIn ? 'events' : 'auth'}
				tabs
				hideNavBar={true}
			>
				<Scene 
					key="launch" 
					component={LaunchScreen} 
					hideNavBar={true} 

				/>
				<Scene 
					key="auth" 
				>
					<Scene 
						key="signin" 
						component={SignInPage} 
						title="Sign In" 
						sceneStyle={{ paddingTop: 65 }} 
						initial
					/>
					<Scene 
						key="signup" 
						component={SignUpPage} 
						title="Sign Up" 
						sceneStyle={{ paddingTop: 65 }}
						backTitle="<-"
						backButtonTextStyle={{ color: '#fff', fontWeight: '400', fontSize: 20 }}
						hideBackImage
					/>
				</Scene>

				<Scene 
					key="events" 
				>
					<Scene
						key="myevents"
						component={MyEventsPage}
						title="My Events"
						sceneStyle={{ paddingTop: 65 }} 
						initial
					/>
					<Scene
						key="event"
						component={EventPage}
						title="Event"
						sceneStyle={{ paddingTop: 65 }} 
						backTitle="<-"
						backButtonTextStyle={{ color: '#fff', fontWeight: '400', fontSize: 20 }}
						hideBackImage
					/>
					<Scene
						key="square"
						component={EventSquarePage}
						title="Square"
						sceneStyle={{ paddingTop: 65 }} 
						backTitle="<-"
						backButtonTextStyle={{ color: '#fff', fontWeight: '400', fontSize: 20 }}
						hideBackImage
					/>
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;
