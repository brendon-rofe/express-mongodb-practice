const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');

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

app.listen(port, () => {
  console.log(`App running on port ${port}`);
})