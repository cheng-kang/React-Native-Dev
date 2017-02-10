import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CMDLine } from '../../components';
import { LastFetchMsg, CommandMsg, ChatsListItem } from './components';

class MsgBoxPage extends Component {
	componentWillMount() {
		this.createDataSource(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}
	createDataSource({ chatsNotif }) {
		if (chatsNotif != null) {
			const ds = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			});

			this.dataSource = ds.cloneWithRows(chatsNotif);
		}
	}
	renderList() {
		if (this.props.chatsNotif === null) {
			return (
				<CMDLine>
					Fetching eventList data for you...
				</CMDLine>
			);
		} else if (this.props.chatsNotif === []) {
			return (
				<CMDLine>
				No chats.
				</CMDLine>
			);
		}
		return (
			<View>
				<CommandMsg title="chats" command="print" hideLine={false} />
				<ListView 
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow}
				/>
			</View>
		);
	}
	renderRow(chat) {
		return (
			<ChatsListItem 
				chat={chat}
				onPress={() => { Actions.chat({ id: chat.id, personName: chat.name }); }}
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
				<CommandMsg title={'fetch chats'} />
				{this.renderList()}
			</View>
		);
	}
}

const mapStateToProps = ({ event }) => {
	const { name, chatsNotif } = event;
	return { name, chatsNotif };
};

export default connect(mapStateToProps, {
	
})(MsgBoxPage);
