module.exports = mongoose => {
  const Product = mongoose.model("product", mongoose.Schema(
    { title: String, description: String, manufactured: Boolean } ,
    { timestamps: true }
  ));

  return Product;
};
