'use strict';

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URL;
const { headers } = require('../cors');
// uncomment below for using data file
// const countriesData = require('../public/data.json');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch(e) {
    console.error(e)
  }
}

exports.handler = async (event, context) => {
  run().catch(console.dir);
  // uncomment below for using data file
  // const data = countriesData
  const data = await client.db("countries").collection("festivals").find().toArray()
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(data)
  };
}