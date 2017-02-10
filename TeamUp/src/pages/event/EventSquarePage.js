import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, ListView } from 'react-native';
import { getEventList } from '../../actions';
import { CMDLine } from '../../components';
import { ActionsView, ActionListItem, EventListItem, CommandMsg, LastFetchMsg } from './components';

class EventSquarePage extends Component {
	componentWillMount() {
		this.props.getEventList();

		this.createDataSource(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}
	createDataSource({ events }) {
		if (events == null) {
			const ds = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			});

			this.dataSource = ds.cloneWithRows([]);
		} else {
			const ds = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			});

			this.dataSource = ds.cloneWithRows(events);
		}
	}
	renderEventList() {
		const { events } = this.props;
		if (events == null) {
			return (
				<CMDLine>
					Fetching eventList data for you...
				</CMDLine>
			);
		} else if (events.length === 0) {
			return (
				<CMDLine style={{ color: 'yellow' }} >
					No event available.
				</CMDLine>
			);
		}

		return (
			<View
				style={{ flex: 1 }}
			>
				<CommandMsg title="eventList" command="print" hideLine={false} />
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow}
				/>
			</View>
		);
	}
	renderActions(title) {
		const actionList = (
			<View>
				<ActionListItem 
					title="my"
					desc="Go to you event list."
					onPress={() => { Actions.myevents({ type: 'reset' }); }}
				/>
				<ActionListItem 
					title="msg"
					desc="Go to Message Box and talk to people!"
					onPress={() => { Actions.msgbox(); }}
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
			<View>
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
				{this.renderActions('Square')}
				<CommandMsg title="fetch eventList" />
				{this.renderEventList()}
			</View>
		);
	}
}

const mapStateToProps = ({ event }) => {
	const { events } = event;
	console.log(events);
	return { events };
};

export default connect(mapStateToProps, {
	getEventList
})(EventSquarePage);
