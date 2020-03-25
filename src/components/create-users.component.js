import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
	constructor(props) {
		super(props);

		this.onchangeUsername = this.onchangeUsername.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: ''
		};
	}

	onchangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const user = {
			username: this.state.username
		};

		console.log(user);

		axios.post('http://localhost:5000/users/add', user).then((res) => console.log(res.data));

		this.setState({
			username: ''
		});
	}

	render() {
		return (
			<div>
				<h3>Crate a new User</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username</label>
						<input
							type="text"
							className="form-control"
							value={this.state.username}
							onChange={this.onchangeUsername}
							required
						/>
					</div>

					<button type="submit" className="btn btn-primary">
						Create Exercise Log
					</button>
				</form>
			</div>
		);
	}
}
