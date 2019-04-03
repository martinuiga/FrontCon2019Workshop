import React, {Component} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {getMeetup as GetMeetUp} from '../graphql/queries';

class Meetup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			meetUp: {}
		};
	}

	componentDidMount() {
		this.getMeetUp();
	}

	async getMeetUp() {
		await API.graphql(graphqlOperation(GetMeetUp, {id: this.props.match.params.id})).then(data => this.setState({meetUp: data.data.getMeetup}));
	}

	render() {
		const meetUp = this.state.meetUp;
		console.log(meetUp);
		return (
			<div>
				<h2>A single meetup:</h2>
				<p>{JSON.stringify(meetUp)}</p>
			</div>

		);
	}

}

export default Meetup;
