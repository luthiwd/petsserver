const router = require("express").Router();
const OwnerModel = require("../models/Owner.model")
const uploader = require("../middlewares/uploader")
const isAuthenticated = require ("../middlewares/isAuthenticated")

//GET 'api/profile' => DISPLAY PROFILE
router.get('/:id', isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload
  try{
    const profileUser = await OwnerModel.findById(_id)
    res.json(profileUser)
  }catch(error){
    res.json(error)
  }
});

//PATCH 'api/profile' => UPDATE PROFILE
router.patch('/:id/edit', isAuthenticated, uploader.single('image'),async (req, res, next) => {
  const { username, email, image, name, surname, password } = req.body
  const { id } = req.params

  //BACKEND VALIDATION PASSWORD
  const passwordRegex = /^(?=.*\d{1})(?=.*[A-Z]{1})[A-Z\d]{8,12}$/;
  if (passwordRegex.test(password) === false){
    res.status(411).json({errorMessage: "Need password with between 8 and 12 characters, 1 upper case letter, 1 number"});
    return;
  }

  //ENCRYPT NEW PASSWORD AND UPDATE PROFILE
  try{
    // ENCRYPT PASSWORD
    const salt = await bcryptjs.genSalt(12);
    const hashPassword = await bcryptjs.hash(password, salt);
    await OwnerModel.findByIdAndUpdate(id, {
      username,
      email,
      image: req.file.path,
      name,
      surname,
      password: hashPassword
    })
    res.json('Profile Update')
  }
  catch(error){
    res.json(error)
  }
});

module.exports = router;