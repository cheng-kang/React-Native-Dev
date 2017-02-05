import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

class LaunchScreen extends Component {
	render() {
		const pageStyle = {
			backgroundColor: '#121619',
			flexDirection: 'column',
			flex: 1,
			justifyContent: 'center',
			paddingBottom: 30
		};
		return (
			<View 
				style={pageStyle}
			>
				<Image 
					source={require('../images/teamup.png')} 
					style={{ width: 300, height: 160, alignSelf: 'center', marginLeft: -10, marginTop: -50 }}
					resizeMode="contain"
				/>
				<ActivityIndicator
					color="white"
				/>
			</View>
		);
	}
}

export default LaunchScreen;
