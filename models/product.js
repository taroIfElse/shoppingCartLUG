const { model, Schema } = require("mongoose");

const productsSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  provider: { type: Schema.Types.ObjectId, ref: "Provider" },
  inCart: { type: Boolean, default: false },
  price: { type: Number, required: true },
});

module.exports = model("Product", productsSchema);
