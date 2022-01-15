const Joi = require("joi");
const dbClient = require("../db/mongoClient");
const ObjectId = require("mongodb").ObjectId;

const InventoryItemSchema = Joi.object({
  productCode: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  quantity: Joi.number().integer().min(0).required(),
});

class InventoryController {
  static getAllInventoryItems(req, res) {
    const db = dbClient.getDb();
    db.collection("inventory")
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        res.json(result);
      });
  }

  static postNewInventoryItem(req, res) {
    // Validate the request body
    const validatedBody = InventoryItemSchema.validate(req.body);
    if (validatedBody.error) { 
      return res.status(400).json(validatedBody.error);
    } else {
      req.body = validatedBody.value;
    }

    const db = dbClient.getDb();
    const newInventoryItem = {
      productCode: req.body.productCode,
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
    };
    db.collection("inventory").insertOne(newInventoryItem, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }

  static getInventoryItem(req, res) {
    const db = dbClient.getDb();
    const queryParams = { _id: ObjectId(req.params.id) };
    db.collection("inventory").findOne(queryParams, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }

  static putInventoryItem(req, res) {
    // Validate the request body
    const validatedBody = InventoryItemSchema.validate(req.body);
    if (validatedBody.error) {
      return res.status(400).json(validatedBody.error);
    } else {
      req.body = validatedBody.value;
    }

    const db = dbClient.getDb();
    const queryParams = { _id: ObjectId(req.params.id) };
    const newValues = {
      $set: {
        productCode: req.body.productCode,
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
      },
    };
    db.collection("inventory").updateOne(
      queryParams,
      newValues,
      (err, result) => {
        if (err) throw err;
        res.json(result);
      }
    );
  }

  static deleteInventoryItem(req, res) {
    const db = dbClient.getDb();
    const queryParams = { _id: ObjectId(req.params.id) };
    db.collection("inventory").deleteOne(queryParams, (err, result) => {
      if (err) {
        res.status(500).json(err);
        throw err;
      }
      res.json(result);
    });
  }
}

module.exports = InventoryController;