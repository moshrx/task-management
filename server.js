const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cors());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const authRoutes = require('./back-end/routes/auth.routes');
const taskRoutes = require('./back-end/routes/task.routes');
const userRoutes = require('./back-end/routes/user.routes');

app.use(express.static(path.join(__dirname, 'front-end')));

// Use routes
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

// define a simple route
app.get('/', (req, res) => {
    console.log('Received request for root');
    res.sendFile(path.join(__dirname, 'front-end','index.html'));
});


// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
