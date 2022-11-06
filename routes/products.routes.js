const { Router } = require("express");
const {
  productsGet,
  productsPost,
  productsPut,
  productsPatch,
  productsDelete,
} = require("../controllers/products.controller");
const router = Router();

router.get("/", productsGet);
router.post("/", productsPost);
router.put("/:id", productsPut);
router.patch("/", productsPatch);
router.delete("/:id", productsDelete);

module.exports = router;
