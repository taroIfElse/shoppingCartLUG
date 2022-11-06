const { response, request } = require("express");
const Provider = require("../models/provider");

const providerPost = async (req = request, res = response) => {
  const { name, tel, email, direction } = req.body;
  const provider = new Provider({ name, tel, email, direction });
  await provider.save();
  res.status("200").json({
    msg: `Provider ${name} was added`,
  });
};

module.exports = {
  providerPost,
};
