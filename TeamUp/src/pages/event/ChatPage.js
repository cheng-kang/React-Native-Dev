import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { CMDLine, CMDInput } from '../../components';
import { LastFetchMsg, CommandMsg, ChatListItem } from './components';
import { clearChatUnreadCount, getChat, sendMsg } from '../../actions';

class ChatPage extends Component {
	state = {
		msg: ''
	};
	componentWillMount() {
		this.personName = this.props.personName;
		this.name = this.props.name;
		console.log(this.props);
		this.props.clearChatUnreadCount(this.props.id);
		this.props.getChat(this.props.id);
		this.createDataSource(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}
	createDataSource({ chat }) {
		if (chat != null) {
			const ds = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			});

			this.dataSource = ds.cloneWithRows(chat);
		}
	}
	renderList() {
		if (this.props.chat === null) {
			return (
				<CMDLine>
					Fetching chat data for you...
				</CMDLine>
			);
		} else if (this.props.chat === []) {
			return (
				<CMDLine>
				No chats.
				</CMDLine>
			);
		}

		return (
			<View>
				<CommandMsg title="chat" command={this.props.personName} hideLine={false} />
				<ListView 
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow.bind(this)}
				/>
			</View>
		);
	}
	renderRow(rowData, sectionID, rowID) {
		return (
			<ChatListItem 
				chat={{ ...rowData, id: rowID }}
				personName={this.props.personName}
				name={this.props.name}
			/>
		);
	}
	render() {
		const pageStyle = {
			backgroundColor: '#121619',
			flexDirection: 'column',
			flex: 1,
			paddingBottom: 30
		};
		return (
			<View style={pageStyle} >
				<LastFetchMsg />
				{this.renderList()}
				<View style={{ flexGrow: 1 }} />
				<CMDInput 
					showLabel={false}
					placeholder="Enter your message."
					value={this.state.msg}
					onChangeText={(text) => { this.setState({ msg: text }); }}
					inputStyle={{ fontWeight: '400', fontSize: 14 }}
					buttonText=">>"
					showButton
					onPress={() => { this.props.sendMsg(this.props.id, this.props.name, this.state.msg); this.setState({ msg: '' }); }}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ event }) => {
	const { name, chat } = event;
	return { name, chat };
};

export default connect(mapStateToProps, {
	clearChatUnreadCount, getChat, sendMsg
})(ChatPage);
