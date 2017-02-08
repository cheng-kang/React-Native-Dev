import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import FirebaseSwitch from './FirebaseSwitch';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import MyEventsPage from './pages/event/MyEventsPage';
import EventPage from './pages/event/EventPage';
import EventSquarePage from './pages/event/EventSquarePage';
import AttendantsPage from './pages/event/AttendantsPage';
import LaunchScreen from './pages/LaunchScreen';


const RouterComponent = () => {
	const sceneStyle = {
		paddingTop: 65
	};
	const backButtonTextStyle = {
		color: '#fff', 
		fontWeight: '400', 
		fontSize: 20
	};
	return (
		<Router 
			navigationBarStyle={{ backgroundColor: '#121619' }} 
			titleStyle={{ color: '#fff', fontWeight: 'bold' }} 
		>
			<Scene 
				key="root"
				component={FirebaseSwitch}
				selector={props => props.signedIn == null ? 'launch' : props.signedIn ? 'main' : 'auth'}
				tabs
				hideNavBar
			>
				<Scene 
					key="launch" 
					component={LaunchScreen} 
					hideNavBar
				/>
				<Scene 
					key="auth" 
				>
					<Scene 
						key="signin" 
						component={SignInPage} 
						title="Sign In" 
						sceneStyle={sceneStyle} 
						initial
					/>
					<Scene 
						key="signup" 
						component={SignUpPage} 
						title="Sign Up" 
						sceneStyle={sceneStyle} 
						backTitle="<-"
						backButtonTextStyle={backButtonTextStyle}
						hideBackImage
					/>
				</Scene>

				<Scene 
					key="main" 
				>
					<Scene
						key="myevents"
						component={MyEventsPage}
						title="My Events"
						sceneStyle={sceneStyle} 
						initial
					/>
					<Scene
						key="event"
						component={EventPage}
						title="Event"
						sceneStyle={sceneStyle} 
						backTitle="<-"
						backButtonTextStyle={backButtonTextStyle}
						hideBackImage
					/>
					<Scene
						key="square"
						component={EventSquarePage}
						title="Square"
						sceneStyle={sceneStyle} 
					/>
					<Scene
						key="attendants"
						component={AttendantsPage}
						title="Attendants"
						sceneStyle={sceneStyle}  
						backTitle="<-"
						backButtonTextStyle={backButtonTextStyle}
						hideBackImage
					/>
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;
