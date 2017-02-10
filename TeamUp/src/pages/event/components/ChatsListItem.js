import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { Actions } from 'react-redux';
import { CMDButton, CMDLine } from '../../../components';

class ChatsListItem extends Component {
	render() {
		const { name, content, date, unreadCount, id } = this.props.chat;
		const viewStyle = {
			paddingBottom: 10
		};
		const nameStyle = {
			marginBottom: 0
		};
		if (!unreadCount) {
			nameStyle.color = 'rgba(255, 255, 255, 0.7)';
		}
		const commomStyle = {
			color: 'rgba(255, 255, 255, 0.7)', 
			margin: 0, 
			paddingTop: 0, 
			paddingBottom: 0, 
			paddingLeft: 30, 
			paddingRight: 10
		};
		const dateStyle = {
			fontSize: 10
		};
		return (
			<TouchableHighlight 
				key={id}
				onPress={this.props.onPress}
			>
				<View style={viewStyle} >
					<CMDLine style={nameStyle} >
					@ {name} {unreadCount ? `(${unreadCount})` : ''}
					</CMDLine>
					<Text style={{ ...commomStyle }}>
					{content}
					</Text>
					<Text style={{ ...commomStyle, ...dateStyle }}>
					{date}
					</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

export { ChatsListItem };
