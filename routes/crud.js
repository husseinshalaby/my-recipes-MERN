const express = require('express');
const router = express.Router();
const multer = require('multer');
const Crud = require('./../models/crud');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../client/src/img');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
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
  console.log(request.file);
  // console.log(request.body);
  let crud = new Crud({
    name: request.body.name,
    ingredients: request.body.ingredients,
    recipe: request.body.recipe,
    image: request.file? request.file.filename: null,
  });

  try {
    crud = await crud.save();

    // response.redirect(`blogs/${blog.slug}`);
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
    image: req.file ? req.file.filename: null,
  }
  // crud = await crud.save();
    Crud.findByIdAndUpdate(req.params.id, crud)
    .then(updatedBlog => {
      res.json(updatedBlog.toJSON())
    })
  .catch(error => console.log(error))
  })
//   Crud.updateOne({ _id: id }, { $set: crud })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//           message: 'Product updated',
//           request: {
//               type: 'GET',
//               url: 'http://localhost:3000/products/' + id
//           }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });
module.exports = router;


// const express = require('express');
// const router = express.Router();


// const {getAllData, createData,getOneItem, updateData, deleteData} = 
// require('../controllers/crud')

// router.route('/').get(getAllData).post(createData)
// router.route('/:itemID').get(getOneItem).patch(updateData).delete(deleteData)

// module.exports = router;