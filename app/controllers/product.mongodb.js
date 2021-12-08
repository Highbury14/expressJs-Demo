const db = require("../models");
const Product = db.mongodb.product;

// Create and save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty !" });
    return;
  }

  // Create a Product and save in the database.
  new Product({
    title: req.body.title,
    description: req.body.description,
    manufactured: req.body.manufactured ? req.body.manufactured : false
  }).save().then(data => { res.send(data) }).catch(err => {
    res.status(500)
    .send({ message: err.message || "Some error occurred while creating the Product." });
  });
};

// Retrieve all Products or find by title, from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } }
  : {};
  Product.find(condition).then(data => { res.send(data); })
  .catch(err => {
    res.status(500).send({ message: err.message || "Some error ocurred while retrieving products." });
  });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id).then(data => { if (!data) {
    res.status(404).send({ message: "Product with id: " + id + ", not found."});
  } else { res.send(data); } }).catch(err => {
    res.status(500).send({ message: "Error while retrieving product with id: " + id + "." });
  });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Updation data cannot be empty !" });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModife: false })
  .then(data => { if (!data) {
    res.status(404).send({ message: "Product with id: ${id}, not updated. Maybe it doesn't exist !" });
  } else { res.send({ message: "Product updated successfully." }); } })
  .catch(err => {
    res.status(500).send({ message: "Error while updating product with id: ${id}." });
  });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id).then(data => { if (!data) {
    res.status(404).send({
      message: "Product with id: ${id}, not deleted. Maybe it doesn't exist !"
    })
  } else { res.send({ message: "Product deleted successfully." }); } })
  .catch(err => { res.status(500).send({
    message: "Error while deleting product with id: ${id}."
  }); });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.deleteMany({}).then(data => { res.send({
    message: "${data.deletedCount} products deleted successfully !"
  }); }).catch(err => { res.status(500).send({
    message: err.message || "Error while deleting all products."
  }); });
};

// Find all manufactured products.
exports.findAllManufactured = (req, res) => {
  Product.find({ manufactured: true }).then(data => { res.send(data); })
  .catch(err => { res.status(500).send({
    message: err.message || "Error while retrieving products."
  }); });
};
