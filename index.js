const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
require("dotenv").config();
const cors = require('cors');
const app = express();
app.use(bodyParser.json());


app.use(cors());
// Connect to MongoDB
const PORT = process.env.PORT || 3000;

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/blog';

// API Endpoints
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

app.post('/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).json(post);
});

app.put('/posts/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
console.log(process.env.MONGO_URL); 

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

   
  })
  .catch((error) => console.log(`${error} did not connect`));