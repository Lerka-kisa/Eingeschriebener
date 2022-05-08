const express = require("express");
const univController = require("../controller/univ");
const router = express.Router();

router.use("/startpage", univController.startpage);
router.use("/offer/:id", univController.offerById);
router.use("/offer", univController.offer);

module.exports = router;