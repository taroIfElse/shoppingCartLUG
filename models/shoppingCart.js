const { model, Schema } = require("mongoose");

const shoppingCartSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});
module.exports = model("cart", shoppingCartSchema);
