const express = require("express");
const {
  loginController,
  registerController,
  centerController,
} = require("../controllers/userCtrl");

const router = express.Router();
router.post("/register", registerController);

router.post("/login", loginController);
router.get("/centers", centerController);

module.exports = router;
