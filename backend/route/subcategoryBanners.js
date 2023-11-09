const express = require("express");
const router = express.Router();
const webbannerController = require("../controller/subcategoryBanners");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/subcatwebBanner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addsubcatwebbanner",
  upload.single("banner"),
  webbannerController.postaddwebbanner
);
router.get("/getallsubcatwebbanner", webbannerController.getallwebbanner);
router.post(
  "/deletesubcatwebbanner/:id",
  webbannerController.postdeletewebbanner
);
module.exports = router;
