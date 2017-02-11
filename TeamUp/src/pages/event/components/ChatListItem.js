import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CMDLine } from '../../../components';

class ChatListItem extends Component {
	render() {
		const { content, date, fromSelf, id } = this.props.chat;
		const { name, personName } = this.props;
		console.log(this.props.chat);
		console.log(this.props);
		let viewStyle = {
			paddingBottom: 10
		};
		if (fromSelf) {
			viewStyle = { ...viewStyle, alignItems: 'flex-end' };
		}
		const nameStyle = {
			marginBottom: 0,
			color: 'white'
		};
		const commomStyle = {
			margin: 0, 
			paddingTop: 0, 
			paddingBottom: 0, 
			paddingLeft: 25, 
			paddingRight: 10,
			color: 'white'
		};
		const dateStyle = {
			color: 'rgba(255, 255, 255, 0.7)', 
			fontSize: 10
		};
		return (
			<View style={viewStyle} key={id} >
				<CMDLine style={nameStyle} >
				@ { fromSelf ? name : personName }
				</CMDLine>
				<Text style={{ ...commomStyle }}>
				{content}
				</Text>
				<Text style={{ ...commomStyle, ...dateStyle }}>
				{date}
				</Text>
			</View>
		);
	}
}

export { ChatListItem };
