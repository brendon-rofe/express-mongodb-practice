const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 3000;

app.use(express.json());

const uri = 'mongodb+srv://brendon:pass123@cluster0.4f6d3vo.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
  } catch (err) {
    console.log(err);
  }
};

connectToDatabase();

app.post('/users', async (req, res) => {
  const db = client.db('user-crud');
  const user = req.body;
  await db.collection('users').insertOne(user);
  res.json({ msg: 'User added' });
});

app.get('/users', async (req, res) => {
  const db = client.db('user-crud');
  const users = await db.collection('users').find().toArray();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const db = client.db('user-crud');
  const id = req.params.id;
  const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const db = client.db('user-crud');
  const id = req.params.id;
  const username = req.body.username;
  await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: { username } });
  res.json({ msg: 'User updated' });
});

app.delete('/users/:id', async (req, res) => {
  const db = client.db('user-crud');
  const id = req.params.id;
  await db.collection('users').deleteOne({ _id: new ObjectId(id) });
  res.json({ msg: `User with id: ${id}, deleted` });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
})