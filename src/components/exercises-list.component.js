import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = (props) => (
	<tr>
		<td>{props.exercise.username}</td>
		<td>{props.exercise.description}</td>
		<td>{props.exercise.duration}</td>
		<td>{props.exercise.date.substring(0, 10)}</td>
		<td>
			<Link to={'/exercises/edit/' + props.exercise._id}>Edit </Link>| {' '}
			<a href="/" onClick={() => props.deleteExercise(props.exercise._id)}>
				Delete
			</a>
		</td>
	</tr>
);

export default class ExercisesList extends Component {
	constructor(props) {
		super(props);

		this.deleteExercise = this.deleteExercise.bind(this);

		this.state = { exercises: [] };
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/exercises/')
			.then((res) => {
				this.setState({
					exercises: res.data
				});
			})
			.catch((err) => console.log(err));
	}

	deleteExercise(id) {
		axios.delete('http://localhost:5000/exercises/' + id).then((res) => console.log(res.data));

		this.setState({
			exercises: this.state.exercises.filter((el) => el._id !== id)
		});
	}

	exerciseList() {
		return this.state.exercises.map((currentExercise) => {
			return (
				<Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
			);
		});
	}

	render() {
		return (
			<div>
				<h1>Logged Exercises</h1>
				<table class="table table-light">
					<thead className="thead-dark">
						<tr>
							<th scope="col">Username</th>
							<th scope="col">Description</th>
							<th scope="col">Duration</th>
							<th scope="col">Date</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>{this.exerciseList()}</tbody>
				</table>
			</div>
		);
	}
}
