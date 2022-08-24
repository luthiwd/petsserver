const router = require("express").Router();
const uploader = require("../middlewares/uploader.js")

//POST 'api/' => ROUTE TO SEND IMAGE TO CLOUDINARY
router.post('/', uploader.single('image'), (req, res, next) => {
  res.json(req.file.path)
});

module.exports = router;
