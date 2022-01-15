const express = require("express");
const inventoryRouter = express.Router();
const InventoryController = require("../controllers/inventoryController");

// get all inventory items
inventoryRouter.get("/", InventoryController.getAllInventoryItems);

// create inventory item
inventoryRouter.post("/add", InventoryController.postNewInventoryItem);

// get inventory item using _id
inventoryRouter.get("/:id", InventoryController.getInventoryItem);

// update/edit inventory item using _id
inventoryRouter.put("/:id", InventoryController.putInventoryItem);

// delete inventory item using _id
inventoryRouter.delete("/:id", InventoryController.deleteInventoryItem);

module.exports = inventoryRouter;