require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.db");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.productsPath = "/api/products";
    this.shoppingCartPath = "/api/cartProducts";
    this.providerCart = "/api/provider";

    this.connectDatabase();

    this.middleWares();

    this.routes();
  }

  async connectDatabase() {
    await dbConnection();
  }
  middleWares() {
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cors());
  }
  routes() {
    this.app.use(this.productsPath, require("../routes/products.routes"));
    this.app.use(
      this.shoppingCartPath,
      require("../routes/cartProducts.routes")
    );
    this.app.use(this.providerCart, require("../routes/provider.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port ", this.port);
    });
  }
}

module.exports = Server;
