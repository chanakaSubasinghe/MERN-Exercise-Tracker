// requiring dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// creating web server
const app = express();

// assigning PORT
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// //database url
const databaseURL = process.env.ATLAS_URL;

//database connection
mongoose.connect(databaseURL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const connection = mongoose.connection;

// requiring routes
const userRoute = require('./routes/user');
const exerciseRoute = require('./routes/exercise');

// using routes
app.use(userRoute);
app.use(exerciseRoute);

connection.once('open', () => {
	console.log('database connected');
});

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
