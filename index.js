const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const PORT = process.env.PORT || 8080

const client = new MongoClient("mongodb+srv://varipvn4nv:performancetesting@cluster0.a0z6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")


app.get('/hello', (req, res) => {
  res.status(200).json({ hello: "World" })
});

app.get('/one-item', async (req, res) => {
  try {
    const item = await client.db("sample_airbnb").collection('listingsAndReviews').findOne({});
    res.status(200).json(item)

  } catch (err) {
    res.status(500).send()
  }
});


app.get('/fifty-items', async (req, res) => {
  try {
    const items = await client.db("sample_airbnb").collection('listingsAndReviews').find({}, { limit: 50 });

    res.status(200).json(await items.toArray())

  } catch (err) {
    res.status(500).send()
  }
});


app.get('/fibonacci', (req, res) => {
  res.status(200).send({ fib: fibonacci(10) })
});

(async function () {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  await app.listen(PORT);
  console.log(`Server started on port ${PORT}`)
}());



function fibonacci(num) {
  if (num <= 1) return num;

  return fibonacci(num - 1) + fibonacci(num - 2);
}
