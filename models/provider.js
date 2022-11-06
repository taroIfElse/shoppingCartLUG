const { model, Schema } = require("mongoose");

const providerSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  direction: { type: String, required: true },
});

module.exports = model("Provider", providerSchema);
