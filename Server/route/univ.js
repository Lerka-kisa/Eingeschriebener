const express = require("express");
const startpageController = require("../controller/startpage");
// const userController = require("../controller/user");
// const reposController = require("../controller/repos");
// const commitsController = require("../controller/commits");
const router = express.Router();

router.use("/startpage", startpageController.startpage);
router.use("/offer/:id", startpageController.offerById);
router.use("/offer", startpageController.offer);
//router.use("/",);
// router.use("/user/:id", userController.infoByUserId);
// router.use("/user", userController.listUsers);
// router.use("/repos/:id/commits/:commitId", commitsController.CommitsById);
// router.use("/repos/:id/commits", commitsController.Commits);
// router.use("/repos/:id", reposController.ReposById);
// router.use("/repos", reposController.Repos);

module.exports = router;