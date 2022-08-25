const router = require("express").Router();
const isAuthenticated = require('../middlewares/isAuthenticated')
const VisitModel = require('../models/Visit.model')

//PATCH '/api/:id/visit' => ADD VISIT FOR THE PET
router.patch('/:idPet/:idVisit/edit', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { title, comment, treatment } = req.body
  try{
    const newVisit = await VisitModel.findByIdAndUpdate
  }catch (error) {
    res.json(error)
  }
});

module.exports = router;