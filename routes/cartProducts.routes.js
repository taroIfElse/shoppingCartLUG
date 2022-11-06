const { Router } = require("express");
const {
  cartProductsGet,
  cartProductsPost,
  cartProductsPut,
  cartProductsPatch,
  cartProductsDelete,
} = require("../controllers/cartProducts.controller");
const router = Router();

router.get("/", cartProductsGet);
router.post("/:id", cartProductsPost);
router.put("/:id", cartProductsPut);
router.patch("/", cartProductsPatch);
router.delete("/:id", cartProductsDelete);

module.exports = router;
