"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
 useNewUrlParser: true,
 useUnifiedTopology: true,
};

// GETS an array of all "data" collection
const getData = async (req, res) => {
 const client = new MongoClient(MONGO_URI, options);
 try {
  await client.connect();
  console.log("client on");

  const db = client.db("data");

  const data = await db.collection("users").find().toArray();

  if (data.length > 0) {
   res.status(200).json({ status: 200, data });
  } else {
   res.status(404).json({ status: 404, message: "Data not found" });
  }
 } catch (error) {
  console.log(error);
  res.status(404).json({ status: 404, message: "Error fetching data" });
 } finally {
  client.close();
  console.log("client off");
 }
};

//GETS user information by _id
const getUser = async (req, res) => {
 const client = new MongoClient(MONGO_URI, options);

 try {
  await client.connect();
  console.log("client on");

  const db = client.db("data");

  const _id = req.params._id;

  const users = await db.collection("users").findOne({ _id: _id });

  if (users) {
   res.status(200).json({ status: 200, users });
  } else {
   res.status(404).send({ status: 404, message: "User not found" });
  }
 } catch (error) {
  res.status(500).json("Error getting users information");
 } finally {
  await client.close();
  console.log("client off");
 }
};

module.exports = {
 getData,
 getUser,
};
