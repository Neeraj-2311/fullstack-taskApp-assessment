const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send('Hello there');
});

const taskRoutes = require('./routes/taskRoutes');

app.use('/tasks', taskRoutes);

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});