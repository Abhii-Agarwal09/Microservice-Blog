const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/events', async (req, res) => {
  try {
    const event = req.body;
    const p1 = await axios.post('http://localhost:4000/events', event);
    const p2 = await axios.post('http://localhost:4001/events', event);
    // const p3 = await axios.post('http://localhost:4002/events', event);
    res.send({ status: 'OK' });
  } catch (err) {
    console.log(err);
  }
});

app.listen(4005, () => console.log('listening on 4005'));
