const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");
const upload = require("../../../middlewares/multer");

router.post('/images', upload.single("avatar"), create);

module.exports = router;
