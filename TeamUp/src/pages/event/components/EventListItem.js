import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class EventListItem extends Component {
	render() {
		const { event } = this.props;
		const { id, title } = event;
		const itemStyle = {
			paddingLeft: 10,
			paddingRight: 10,
			paddingTop: 8,
			paddingBottom: 8,
		};
		const textStyle = {
			color: '#fff',
			fontWeight: '500'
		};
		return (
			<TouchableHighlight 
				onPress={() => { 
					Actions.event({ event });
				}}
			>
				<View style={itemStyle} >
					<Text 
						style={textStyle}
					>
					{'>'} {title}
					</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

export { EventListItem };
