const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  // Emitting event
  axios
    .post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: { content, id: commentId, postId: req.params.id },
    })
    .catch((err) => console.log(err));
  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Receive event', req.body.type);
  res.send({});
});

app.listen(4001, () => console.log('listening on port 4001'));
