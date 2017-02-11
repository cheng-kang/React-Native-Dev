import React, { Component } from 'react';
import { View, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import _ from 'lodash';
import { LastFetchMsg, CommandMsg, HashTag, InfoListItem, ActionsView, ActionListItem } from './components';
import { CMDLine } from '../../components';
import { selectUser, deselectUser } from '../../actions';

class AttendantsPage extends Component {
	componentWillMount() {
		this.currentEvent = this.props.currentEvent;
		this.actionMsg = null;

		this.createDataSource(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.currentEvent = nextProps.currentEvent;
		const msg = nextProps.actionMsg;
		if (msg != null) {
			this.actionMsg = msg;
		}

		this.createDataSource(nextProps);
	}
	createDataSource({ currentEvent }) {
		const { registeredUser } = currentEvent;
		const users = _.map(registeredUser, (value, uid) => {
			return { ...value, uid };
		});
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(users);
	}
	renderTags(tags) {
		if (!tags) {
			return '';
		}

		const hashTag = (tag) => {
			return (
				<HashTag key={tag} >{tag}</HashTag>
			);
		};
		const tagsView = [];
		for (let i = 0; i < tags.length; i++) {
			tagsView.push(hashTag(tags[i]));
		}
		return (<View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }} >{tagsView}</View>);
	}
	renderActions(id, name) {
		const actionList = (
				<View>
				<ActionListItem 
					title="chat"
					desc={`Chat with ${name}!`}
					onPress={() => { Actions.chat({ id, personName: name }); }}
				/>
				</View>
		);
		return (
			<ActionsView 
				title="chat"
				actionList={actionList}
			/>
		);
	}
	renderRow(user) {
		const { uid, name, regDate, selfTags, targetTags, selfDesc, targetDesc } = user;
		const { currentUser } = firebase.auth(); 
		const selectedUserId = this.props.selectedUserId;
		console.log(uid !== currentUser.uid);
		console.log(uid);
		console.log(currentUser.uid);
		if (selectedUserId === uid) {
			return (
				<TouchableHighlight
					key={uid}
					onPress={() => { this.props.deselectUser(); }}
				>
					<View style={{ backgroundColor: 'black' }} >
						<CMDLine style={{ fontWeight: 'bold' }} >
						@ {name}
						</CMDLine>
						<View style={{ height: 1, marginLeft: 10, marginRight: 10, backgroundColor: '#121619' }} />
						{uid !== currentUser.uid ? this.renderActions(uid, name) : (<View />) }
						<CommandMsg title={name} command="details" >
						Details:
						</CommandMsg>
						<InfoListItem name="selfTags" value={this.renderTags(selfTags)} />
						<InfoListItem name="targetTags" value={this.renderTags(targetTags)} />
						<InfoListItem name="selfDesc" value={selfDesc || ''} />
						<InfoListItem name="targetDesc" value={targetDesc || ''} />
					</View>
				</TouchableHighlight>
			);
		}
		return (
			<TouchableHighlight 
				key={uid}
				onPress={() => { 
					this.props.selectUser(uid);
				}}
			>
				<View>
					<CMDLine>
					@ {name}
					</CMDLine>
				</View>
			</TouchableHighlight>
		);
	}
	render() {
		const { title } = this.props.currentEvent;
		const pageStyle = {
			backgroundColor: '#121619',
			flexDirection: 'column',
			flex: 1
		};
		return (
			<View style={pageStyle} >
				<LastFetchMsg />
				<CommandMsg title={title} command="attendants" hideLine={false} />
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow.bind(this)}
				/>
				<View style={{ height: 20 }} />
			</View>
		);
	}
}

const mapStateToProps = ({ event }) => {
	const { currentEvent, selectedUserId } = event;
	return { currentEvent, selectedUserId };
};

export default connect(mapStateToProps, {
	selectUser, deselectUser
})(AttendantsPage);
