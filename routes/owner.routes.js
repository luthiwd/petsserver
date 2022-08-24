const router = require("express").Router();
const OwnerModel = require('../models/Owner.model')
const isAuthenticated = require ('../middlewares/isAuthenticated')

//GET 'api/owner/pets' => RENDER ALL PETS OF OWNER
router.get('/', isAuthenticated, async (req, res, next) => {
  const { id } = req.payload
  //FIND OWNER BY ID
  try{
    const oneOwner = await OwnerModel.findById(id)
    res.json(oneOwner)
  }
  catch(error){
    res.json(error)
  }
});

module.exports = router;