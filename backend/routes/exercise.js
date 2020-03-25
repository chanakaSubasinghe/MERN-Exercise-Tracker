const router = require('express').Router();
const Exercise = require('../models/exercise');

router.get('/exercises', (req, res) => {
	Exercise.find().then((exercises) => res.json(exercises)).catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/exercises/add', (req, res) => {
	const username = req.body.username;
	const description = req.body.description;
	const duration = Number(req.body.duration);
	const date = Date.parse(req.body.date);

	const newExercise = new Exercise({
		username,
		description,
		duration,
		date
	});

	newExercise.save().then(() => res.json('Exercise added!')).catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/exercises/:id', (req, res) => {
	Exercise.findById(req.params.id)
		.then((exercise) => res.json(exercise))
		.catch((err) => res.status(400).json('Error ' + err));
});

router.delete('/exercises/:id', (req, res) => {
	Exercise.findByIdAndRemove(req.params.id)
		.then(() => res.json('Exercise deleted'))
		.catch((err) => res.status(400).json('Error ' + err));
});

router.post('/exercises/:id', (req, res) => {
	Exercise.findById(req.params.id)
		.then((exercise) => {
			(exercise.username = req.body.username),
				(exercise.description = req.body.description),
				(exercise.duration = Number(req.body.duration)),
				(exercise.date = Date.parse(req.body.date));

			exercise.save().then((exercise) => res.json(exercise)).catch((err) => res.status(400).json('Error ' + err));
		})
		.catch((err) => res.status(400).json(err));
});

module.exports = router;
