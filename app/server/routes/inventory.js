const express = require("express");
const inventoryRouter = express.Router();
const dbClient = require("../db/client");
const ObjectId = require("mongodb").ObjectId;

inventoryRouter.route("/inventory").get((req, res) => {
  const db = dbClient.getDb();
  db.collection("inventory")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// get inventory item using _id
inventoryRouter.route("/inventory/:id").get((req, res) => {
  const db = dbClient.getDb();
  const queryParams = { _id: ObjectId(req.params.id) };
  db.collection("inventory").findOne(queryParams, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// create inventory item
inventoryRouter.route("/inventory/add").post((req, response) => {
  const db = dbClient.getDb();
  const newInventoryItem = {
    code: req.body.code,
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
  };
  db.collection("inventory").insertOne(newInventoryItem, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// update/edit inventory item using _id
inventoryRouter.route("/update/:id").post((req, response) => {
  const db = dbClient.getDb();
  const queryParams = { _id: ObjectId(req.params.id) };
  const newValues = {
    $set: {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
    },
  };
  db.collection("inventory").updateOne(queryParams, newValues, (err, res) => {
    if (err) throw err;
    console.log("1 document updated");
    response.json(res);
  });
});

// delete inventory item using _id
inventoryRouter.route("/:id").delete((req, response) => {
  const db = dbClient.getDb();
  const queryParams = { _id: ObjectId(req.params.id) };
  db.collection("inventory").deleteOne(queryParams, (err, obj) => {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

inventoryRouter.route("/inventory").get((req, res) => {
  const db = dbClient.getDb();
  db.collection("inventory")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = inventoryRouter;
