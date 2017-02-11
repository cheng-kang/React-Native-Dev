import React, { Component } from 'react';
import firebase from 'firebase';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getMyEventList, getChatsNotification } from '../../actions';
import { CMDLine } from '../../components';
import { ActionsView, ActionListItem, EventListItem, CommandMsg, LastFetchMsg } from './components';

class MyEventsPage extends Component {
	componentWillMount() {
		this.props.getMyEventList();
		// to get unreadMsgCount
		this.props.getChatsNotification();

		this.createDataSource(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}
	createDataSource({ myEvents }) {
		if (myEvents == null) {
			const ds = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			});

			this.dataSource = ds.cloneWithRows([]);
		} else {
			const ds = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			});

			this.dataSource = ds.cloneWithRows(myEvents);
		}
	}
	renderEventList() {
		const { myEvents } = this.props;
		if (myEvents == null) {
			return (
				<CMDLine>
					Fetching myEventList data for you...
				</CMDLine>
			);
		} else if (myEvents.length === 0) {
			return (
				<CMDLine style={{ color: 'yellow' }} >
					MyEventList data not found, go to Event Square to register an event.
				</CMDLine>
			);
		} 
		return (
			<View
				style={{ flex: 1 }}
			>
				<CommandMsg title="myEventList" command="print" hideLine={false} />
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow}
				/>
			</View>
		);
	}
	renderActions(title) {
		const { unreadCount } = this.props;
		const actionList = (
				<View>
				<ActionListItem 
					title="square"
					desc="Go to Event Square to view all events!"
					onPress={() => { Actions.square({ type: 'reset' }); }}
				/>
				<ActionListItem 
					title={unreadCount ? `msg (${unreadCount})` : 'msg'}
					desc="Go to Message Box and talk to people!"
					onPress={() => { Actions.msgbox(); }}
				/>
				<ActionListItem 
					title="sign out"
					desc="Press here to sign out."
					onPress={() => { 
						firebase.auth().signOut()
							.then(() => {
								console.log('sign out');
							})
							.catch(() => {
								console.log('sign out fail');
							});
					}}
				/>
				</View>
		);
		return (
			<ActionsView 
				title={title}
				actionList={actionList}
			/>
		);
	}
	renderRow(event) {
		return (
			<View
				key={event.id}
			>
				<EventListItem event={event} />
			</View>
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
				{this.renderActions('MyEvents')}
				<CommandMsg title="fetch myEventList" />
				{this.renderEventList()}
			</View>
		);
	}
}

const mapStateToProps = ({ event }) => {
	const { myEvents, currentEvent, unreadCount } = event;

	return { myEvents, currentEvent, unreadCount };
};

export default connect(mapStateToProps, {
	getMyEventList, getChatsNotification
})(MyEventsPage);
