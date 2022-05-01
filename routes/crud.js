const express = require('express');
const router = express.Router();
const multer = require('multer');
const Crud = require('./../models/crud');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './client/src/img');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


const {getAllData, createData,getOneItem, updateData, deleteData} = 
require('../controllers/crud')

router.route('/').get(getAllData)
router.route('/:itemID').get(getOneItem).delete(deleteData)
//route that handles new post
router.post('/', upload.single('image'), async (request, response) => {
  let crud = new Crud({
    name: request.body.name,
    ingredients: request.body.ingredients,
    recipe: request.body.recipe,
    image: request.body.image
  });

  try {
    crud = await crud.save();
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id", upload.single('image'),(req, res, next) => {
  const id = req.params.id;
  let crud = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    recipe: req.body.recipe,
    image: req.body.image,

  }
    Crud.findByIdAndUpdate(req.params.id, crud)
    .then(updatedBlog => {
      res.json(updatedBlog.toJSON())
    })
  .catch(error => console.log(error))
  })

module.exports = router;
