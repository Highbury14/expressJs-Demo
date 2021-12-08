const products = require("../app/controllers/product.mysql");
var router = require("express").Router();

// Create a new product.
router.post("/products/", products.create);

// Retrieve all products.
router.get("/products/", products.findAll);

// Retrieve all manufactured products.
router.get("/products/manufactured", products.findAllManufactured);

// Retrieve a single product with id.
router.get("/products/:id", products.findOne);

// Update a product with id.
router.put("/products/:id", products.update);

// Delete a product with id.
router.delete("/products/:id", products.delete);

//Delete all products.
router.delete("/products/", products.deleteAll);

module.exports = router;
