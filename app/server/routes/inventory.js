const express = require("express");
const inventoryRouter = express.Router();
const db = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

inventoryRouter.route("/inventory").get((req, res) => {
  const db_connect = db.getDb();
  db_connect
    .collection("inventory")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});


inventoryRouter.route("/inventory/:id").get((req, res) => {
  const db_connect = db.getDb();
  const queryParams = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("inventory")
      .findOne(queryParams, (err, result) => {
        if (err) throw err;
        res.json(result);
      });
});


inventoryRouter.route("/inventory/add").post((req, response) => {
  const db_connect = db.getDb();
  const myobj = {
    code: req.body.code,
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
  };
  db_connect.collection("inventory").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});


inventoryRouter.route("/update/:id").post((req, response) => {
  const db_connect = db.getDb();
  const queryParams = { _id: ObjectId( req.params.id )};
  const newValues = {
    $set: {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
    },
  };
  db_connect
    .collection("inventory")
    .updateOne(queryParams, newValues, (err, res) => {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});


inventoryRouter.route("/:id").delete((req, response) => {
  const db_connect = db.getDb();
  const queryParams = { _id: ObjectId( req.params.id )};
  db_connect.collection("inventory").deleteOne(queryParams, (err, obj) => {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = inventoryRouter;
