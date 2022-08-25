const router = require("express").Router();
const PetModel = require('../models/Pet.model')
const uploader = require('../middlewares/uploader')
const isAuthenticated = require('../middlewares/isAuthenticated')

//GET '/api/pets/:id' => RENDER ALL PETS ACCORDING TO OWNER'S ID
router.get('/pets', isAuthenticated, async (req, res, next) => {
  const { id } = req.payload;
  //OBTAINS ALL PETS BY OWNER'S ID
  try{
    const findPets = await PetModel.find({"owner":_id})
    res.json(findPets)
  }catch (error) {
    res.json(error)
  }
});

//POST '/api/pet/create' => CREATE A NEW PET
router.post('/pet/create', isAuthenticated, uploader.single('image'), async (req, res, next) => {
  const { name, breed, birthday, chip, image, spices, otherspices } = req.body;
  //CREATE A NEW PET
  try{
    if (!image){
      image =  "https://res.cloudinary.com/djersm2h6/image/upload/v1661182937/petsdiary/cat-dog_vqwnxs.png";
    }
    const createPet = await PetModel.create({
      name,
      breed,
      birthday,
      chip,
      spices,
      otherspices,
      owner: req.payload._id,
      image: req.file.path
    })
  }catch (error) {
    res.json(error)
  }
});

//GET '/api/pet/:id/details' => RENDER ALL PET'S DETAILS
router.get('/:id/details', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  //OBTAIN PET'S DETAILS
  try{
    const thePet = await PetModel.findById(id); //! TRIPLE POPULATE FOR VISIT, VACCINE & WORMING
    res.json(thePet);
  }catch (error){
    res.json(error)
  }
});

//PATCH '/api/pet/:id/edit' => UPDATE A PET'S PROFILE
router.patch('/:id/edit', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { name, breed, birthday, chip, image, spices, otherspices } = req.body;
  //UPDATE 
  try{

  }catch (error) {
    res.json(error)
  }
})

//DELETE '/api/pet/:id/delete' => DELETE A PET
router.delete('/:id', isAuthenticated, async (req,res,next) => {
  const { id } = req.params;
  //DELETE A PET BY ID
  try{
    await PetModel.findByIdAndDelete(id);
    res.json('Pet has been deleted')
  }catch (error){
    res.json(error)
  }
});

module.exports = router;