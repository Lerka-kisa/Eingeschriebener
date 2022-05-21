const express = require("express");
const fitController = require("../controller/fit");
const adminController = require("../controller/admin");
const router = express.Router();

//router.use("/startpage", fitController.startpage);
router.use("/userinfo/add", fitController.addInfo);
router.use("/userinfo/marks", fitController.updMarks);
/*router.use("/userinfo/data", fitController.userinfodata);*/
/*router.use("/userinfo/application", fitController.userApplication);*/
router.use("/userinfo/change_filing", fitController.changeFiling);
//router.use("/userinfo/delete_filing", fitController.deleteFiling);
router.use("/userinfo", fitController.userinfo);

router.use("/admin/all_good_application",adminController.allGoodApplication)
router.use("/admin/all_bad_application/approve",adminController.approveBadApplication)
router.use("/admin/all_bad_application/delete",adminController.deleteBadApplication)
router.use("/admin/all_bad_application",adminController.allBadApplication)
router.use("/admin",adminController.admin)

router.use("/getrating", fitController.getrating);
router.use("/check_filing", fitController.checkFiling);
router.use("/filing", fitController.filing);


router.use("/", fitController.mainPage);

module.exports = router;
