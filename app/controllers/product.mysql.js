const db = require("../models");
const Product = db.sqldb.product;
const Op = db.sqldb.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty !" });
    return;
  }

  // Create a product
  const product = {
    title: req.body.title,
    description: req.body.description,
    manufactured: req.body.manufactured ? req.body.manufactured : false
  };

  // Save product in the database.
  Product.create(product).then(data => { res.send(data); })
  .catch(err => { res.status(500).send({
    message: err.message || "Error while creating the product."
  }); });

};

// Retrieve all products or find by title, from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition }).then(data => { res.send(data); })
  .catch(err => { res.status(500).send({
    message: err.message || "Error while retrieving products."
  }); });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id).then(data => { if (data) { res.send(data); } else {
    res.status(404).send({
      message: "Product with id: ${id}, not found."
    });
  } }).catch(err => { res.status(500).send({
    message: err.message || "Error retrieving product with id: ${id}."
  }); });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, { where: { id: id } }).then(num => { if (num == 1) {
    res.send({ message: "Product updated successfully." });
  } else { res.send({
    message: "Product with id: ${id}, not updated. Maybe it doesn't exist !"
  }); } }).catch(err => { res.status(500).send({
    message: err.message || "Error updating product with id: ${id}."
  }); });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({ where: { id: id } }).then(num => { if (num == 1) { res.send({
    message: "Product deleted successfully !"
  }); } else { res.send({
    message: "Product with id: ${id}, not deleted. Maybe it doesn't exist !"
  }); } }).catch(err => { res.status(500).send({
    message: err.message || "Error deleting product with id: ${id}."
  }); });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({ where: {}, truncate: false }).then(nums => { res.send({
    message: "${nums} products deleted successfully !"
  }); }).catch(err => { res.status(500).send({
    message: err.message || "Error while deleting products."
  }); });
};

// Find all manufactured Products
exports.findAllManufactured = (req, res) => {
  Product.findAll({ where: { manufactured: true } }).then(data => { res.send(data); })
  .catch(err => { res.status(500).send({
    message: err.message || "Error while retrieving products."
  }); });
};
