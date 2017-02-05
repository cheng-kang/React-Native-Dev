import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getMyEventList, printTitle } from '../../actions';
import MyEventsListItem from './MyEventsListItem';

class MyEventsPage extends Component {
	componentWillMount() {
		this.props.getMyEventList();

		this.createDataSource(this.props);
	}
	componentDidMount() {
		// setTimeout(() => {
		// 	firebase.auth().signOut()
		// 		.then(() => {
		// 			console.log('sign out');
		// 		})
		// 		.catch(() => {
		// 			console.log('sign out fail');
		// 		});
		// }, 500);
	}
	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}
	createDataSource({ myEvents }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(myEvents);
		console.log(myEvents);
	}
	eventList() {
		const lineStyle = {
			fontWeight: '500',
			marginTop: 10,
			marginBottom: 10,
			paddingLeft: 10,

		};
		if (this.props.myEvents.length === 0) {
			return (
				<Text style={{ ...lineStyle, color: 'yellow' }} >
					MyEventList data not found, go to EventList to join an event.
				</Text>
			);
		} else {
			return (
				<View
					style={{ flex: 1 }}
				>
					<Text style={{ ...lineStyle, color: 'white', paddingBottom: 0 }} >
					===========================
					</Text>
					<ListView
						enableEmptySections
						dataSource={this.dataSource}
						renderRow={this.renderRow}
						style={{ }}
					/>
				</View>
			);
		}
	}
	renderRow(event) {
		return (
			<View>
				<MyEventsListItem event={event} />
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
				<Text
					style={welcomMsgStyle}
				>
				$ fetch myEventList {'\n\n'}
				loading...
				</Text>
				{this.eventList()}
			</View>
		);
	}
}

const mapStateToProps = ({ event }) => {
	const { myEvents, title } = event;

	return { myEvents, title };
};

export default connect(mapStateToProps, {
	getMyEventList, printTitle
})(MyEventsPage);
