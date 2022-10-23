const router = require("express").Router();
const isAuthenticated = require('../middlewares/isAuthenticated')
const VisitModel = require('../models/Visit.model')
const PetModel = require('../models/Pet.model')

//GET 'api/visits' => RENDER ALL VISIT BY PET ID
router.get ('/', isAuthenticated,async (req, res, next) => {
  
})

//PATCH '/api/:idPet/:idVisit/edit' => ADD NEW VISIT FOR THE PET
router.patch('/:idPet/:idVisit/edit', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { title, comment, treatment } = req.body
  try{
    const newVisit = await VisitModel.create(id,{
      title,
      comment,
      treatment
    })
  }catch (error) {
    res.json(error)
  }
});

module.exports = router;