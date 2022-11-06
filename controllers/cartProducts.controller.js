const { response, request } = require("express");
const ShoppingCart = require("../models/shoppingCart");
const Product = require("../models/product");
const shoppingCart = require("../models/shoppingCart");
const cartProductsGet = async (req, res) => {
  const productsCart = await ShoppingCart.find();
  productsCart
    ? res.json(productsCart)
    : res.json({ msg: "Shopping cart empty" });
};
const cartProductsPost = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    const productId = product._id;
    const isInCart = await ShoppingCart.findById(productId);
    if (!isInCart) {
      const addProductToCart = new ShoppingCart({
        name: product.name,
        img: product.img,
        price: product.price,
        amount: 1,
      });
      await Product.findByIdAndUpdate(
        product._id,
        {
          inCart: true,
        },
        { new: true }
      )
        .then((p) => {
          addProductToCart.save().then(() => {
            res.json({
              msg: `The product ${product.name} was added to cart`,
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      res
        .status(404)
        .json({ msg: `The product ${product.name} is already in the cart` });
    }
  } else {
    res.status(404).json({ msg: "The product is not in database" });
  }
};
const cartProductsPut = async (req, res) => {
  const { id } = req.params;
  const { query } = req.query;
  const { amount } = req.body;
  const prodSelected = await ShoppingCart.findById(id);
  let newAmount;
  //TODO:
  //VALIDAR
  if (!query) {
    res.status(404).json({ msg: "No query" });
    return;
  } else if (prodSelected && query === "del") {
    newAmount = prodSelected.amount - 1;
    shoppingCart
      .findByIdAndUpdate(id, { amount: newAmount }, { new: true })
      .then((p) => {
        res.json({
          msg: `Removed a unit of ${p.name}`,
          p,
        });
      });
  } else if (prodSelected && query === "add") {
    newAmount = prodSelected.amount + amount;
    shoppingCart
      .findByIdAndUpdate(id, { amount: newAmount }, { new: true })
      .then((p) => {
        res.json({
          msg: `Added a unit of ${p.name}`,
          p,
        });
      });
  } else {
    console.log("Error");
  }
};
const cartProductsPatch = () => {};
const cartProductsDelete = async (req, res) => {
  const { id } = req.params;

  const productInCart = await ShoppingCart.findById(id);

  if (!productInCart) {
    res.json({ msg: `The product is not in the cart` });
  } else {
    await shoppingCart.findByIdAndDelete(productInCart.id);
    res.json({ msg: `The product ${productInCart.name} was removed` });
  }

  // const { name, img, price, _id } = await Product.findOne({
  //   name: productInCart.name,
  // });

  // await Product.findByIdAndUpdate(
  //   _id,
  //   { inCart: false, name, img, price },
  //   { new: true }
  // )
  //   .then((p) => {
  //     res.json({ msg: `Product ${p.name} was remmoved` });
  //   })
  //   .catch((e) => res.json({ msg: `Error :${e}` }));
};

module.exports = {
  cartProductsGet,
  cartProductsPost,
  cartProductsPut,
  cartProductsPatch,
  cartProductsDelete,
};
