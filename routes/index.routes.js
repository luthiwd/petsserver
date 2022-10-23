const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
//ROUTE OF AUTHENTICATION
const authRoutes = require ('./auth.routes')
router.use('/auth', authRoutes)
//ROUTE PROFILE
const profileRoutes = require ('./profile.routes')
router.use('/profile', profileRoutes)
//ROUTE UPLOADER IMAGE TO CLOUDINARY
const uploaderRoutes = require ('./uploader.routes')
router.use('/uploader', uploaderRoutes)
//ROUTE PET
const petRoutes = require ('./pet.routes')
router.use('/pet', petRoutes)


module.exports = router;
