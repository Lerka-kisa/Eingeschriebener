const express = require("express");
const fitController = require("../controller/fit");
const router = express.Router();

//router.use("/startpage", fitController.startpage);
router.use("/userinfo/add", fitController.addInfo);
router.use("/userinfo/marks", fitController.updMarks);
router.use("/userinfo/data", fitController.userinfodata);
router.use("/userinfo/application", fitController.userApplication);
router.use("/userinfo/change_filing", fitController.changeFiling);
router.use("/userinfo", fitController.userinfo);
router.use("/getrating", fitController.getrating);
router.use("/filing", fitController.filing);


router.use("/", fitController.mainPage);

module.exports = router;