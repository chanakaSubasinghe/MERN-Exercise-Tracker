import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
import ExercisesList from './components/exercises-list.component';
import EditExercises from './components/edit-exercises.component';
import CreateExercises from './components/create-exercises.component';
import CreateUsers from './components/create-users.component';

function App() {
	return (
		<Router>
			<Navbar />

			<div className="container">
				<br />
				<Route path="/" exact component={ExercisesList} />
				<Route path="/exercises/edit/:id" exact component={EditExercises} />
				<Route path="/exercises/create" exact component={CreateExercises} />
				<Route path="/users/create" exact component={CreateUsers} />
			</div>
		</Router>
	);
}

export default App;
