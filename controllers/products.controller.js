const { response, request } = require("express");
const Product = require("../models/product");
const productsGet = async (req = request, res = response) => {
  const products = await Product.find();
  products ? res.json({ products }) : res.json({ msg: "No products" });
};
const productsPost = async (req, res) => {
  const { name, img, price, provider } = req.body;
  const product = new Product({ name, img, price, provider });
  if (product) {
    res.json({ msg: `product ${name} was added` });
    await product.save();
  }
};
const productsPut = () => {};
const productsPatch = () => {};
const productsDelete = () => {};

module.exports = {
  productsGet,
  productsPost,
  productsPut,
  productsPatch,
  productsDelete,
};
