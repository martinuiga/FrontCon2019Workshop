import React, {Component} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {createMeetup as CreateMeetup} from '../graphql/mutations';

class AddMeetup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			group: '',
			location: '',
			date: '',
			timeFrom: '',
			timeTo: '',
			description: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();

		await API.graphql(graphqlOperation(CreateMeetup, {
			input: {
				name: this.state.name,
				group: this.state.group,
				location: this.state.location,
				date: this.state.date,
				startTime: this.state.timeFrom,
				endTime: this.state.timeTo,
				description: this.state.description,
			}

		}));
	}

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	};

	render() {
		return (
			<div>
				<h2>Add a meetup:</h2>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
						<input type="text" name="name" onChange={this.handleChange}/>
					</label>
					<label>
						Group:
						<input type="text" name="group" onChange={this.handleChange}/>
					</label>
					<label>
						Location:
						<input type="text" name="location" onChange={this.handleChange}/>
					</label>
					<label>
						Date:
						<input type="text" name="date" onChange={this.handleChange}/>
					</label>
					<label>
						Time from:
						<input type="text" name="timeFrom" onChange={this.handleChange}/>
					</label>
					<label>
						Time to:
						<input type="text" name="timeTo" onChange={this.handleChange}/>
					</label>
					<label>
						Description:
						<input type="text" name="description" onChange={this.handleChange}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
			</div>
		);
	}
}

export default AddMeetup;
