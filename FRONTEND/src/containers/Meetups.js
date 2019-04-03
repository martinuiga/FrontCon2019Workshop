import React, {Component} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {deleteMeetup as DeleteMeetup} from '../graphql/mutations';
import {listMeetups as ListMeetups} from '../graphql/queries';
import {onCreateMeetup, onDeleteMeetup} from '../graphql/subscriptions'

class Meetups extends Component {
	constructor(props) {
		super(props);

		this.state = {
			meetUps: []
		};
	}

	componentDidMount() {
		this.getMeetUps();

		API.graphql(
			graphqlOperation(onCreateMeetup)
		).subscribe({
			next: (eventData) => {
				const updatedMeetup = eventData.value.data.onCreateMeetup;
				const meetUps = [
					...this.state.meetUps.filter(meetup => {
						return meetup.id !== updatedMeetup.id
					}),
					updatedMeetup
				];
				this.setState({meetUps})
			}
		});
		/*
		API.graphql(
			graphqlOperation(onDeleteMeetup)
		).subscribe({
			next: (eventData) => {
				const deletedMeetup = eventData.value.data.onDeleteMeetup;
				const meetUps = [
					...this.state.meetUps.filter(meetup => {
						return meetup.id !== deletedMeetup.id
					})
				];
				this.setState({meetUps})
			}
		});
		*/
	}


	async getMeetUps() {
		await API.graphql(graphqlOperation(ListMeetups)).then(data => this.setState({meetUps: data.data.listMeetups.items}));
	}

	async deleteMeetup(id) {
		await API.graphql(graphqlOperation(DeleteMeetup, {
			input: {
				id: id
			}
		}));
	};

	render() {
		const {meetUps} = this.state;

		return (
			<div className="meetup-list">
				<h2>List of meetups:</h2>
				<ul>
					{meetUps.map(meetUp =>
						<li key={meetUp.id}>
							<a href={'http://localhost:3000/meetups/' + meetUp.id}>{meetUp.name}</a>
							<button onClick={() => this.deleteMeetup(meetUp.id)}>Delete</button>
						</li>
					)}
				</ul>
			</div>
		);
	}
}

export default Meetups;
