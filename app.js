const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Use environment variable for MongoDB connection string
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to MongoDB!');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const todoSchema = new mongoose.Schema({
  text: String
});
const Todo = mongoose.model('Todo', todoSchema);

app.get('/', async (req, res) => {
  const todos = await Todo.find({});
  res.send(`
    <h1>Wiz Technical Exercise App</h1>
    <p>Connected to MongoDB. Found ${todos.length} todo items.</p>
    <p>This application is running in a private subnet on an EKS cluster.</p>
    <p>The MongoDB database is an outdated version with excessive IAM permissions, and its backups are publicly exposed.</p>
  `);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});