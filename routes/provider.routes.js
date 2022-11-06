const { Router } = require("express");
const { providerPost } = require("../controllers/provider.controller");
const router = Router();

router.post("/", providerPost);

module.exports = router;
