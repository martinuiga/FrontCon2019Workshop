import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Meetups from './containers/Meetups.js';
import Meetup from './containers/Meetup.js';
import AddMeetup from './containers/AddMeetup.js';
import UpdateMeetup from './containers/UpdateMeetup.js';
import {withAuthenticator} from 'aws-amplify-react';

class App extends Component {

	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<div>
							<nav>
								<ul>
									<li><Link to="/">All meetups</Link></li>
									<li><Link to="/add">Add a meetup</Link></li>
									<li><Link to="/update/123">Update a meetup</Link></li>
								</ul>
							</nav>
						</div>
					</header>
					<div>
						<Route path="/" exact component={Meetups}/>
						<Route path="/meetups/:id" component={Meetup}/>
						<Route path="/add" component={AddMeetup}/>
						<Route path="/update/:id" component={UpdateMeetup}/>
					</div>
				</div>
			</Router>
		);
	}
}

export default withAuthenticator(App, {includeGreetings: true})
