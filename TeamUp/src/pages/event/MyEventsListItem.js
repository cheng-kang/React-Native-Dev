import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { CMDLine, CMDButton } from '../../components';

class MyEventsListItem extends Component {
	render() {
		const { title } = this.props.event;
		const itemStyle = {
			paddingLeft: 10,
			paddingRight: 10,
			paddingTop: 8,
			paddingBottom: 8,
		};
		return (
			<TouchableHighlight onPress={() => {}}>
				<View style={itemStyle} >
					<CMDLine>
						{title}
					</CMDLine>
				</View>
			</TouchableHighlight>
		);
	}
}

export default MyEventsListItem;
