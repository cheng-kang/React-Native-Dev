import React, { Component } from 'react';
import { View, Text } from 'react-native';

class EventPage extends Component {
	render() {
		const pageStyle = {
			backgroundColor: '#121619',
			flexDirection: 'column',
			flex: 1,
			paddingBottom: 30
		};
		const welcomMsgStyle = {
			color: '#fff',
			fontWeight: '500',
			marginTop: 10,
			marginBottom: 10,
			paddingLeft: 10

		};
		const dateString = (new Date()).toUTCString();
		const date = dateString.substring(0, dateString.length - 4);
		return (
			<View style={pageStyle} >
				<Text 
					style={welcomMsgStyle}
				>
				Last fetch: {date}
				</Text>
			</View>
		);
	}
}

export default EventPage;
