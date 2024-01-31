const express = require('express');
const router = express.Router();
const Recipe = require('../Model/Recipe'); // Import the Recipe model
const Fuse = require('fuse.js');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/data/uploads', // Destination directory
  filename: function (req, file, cb) {
      // Define a custom file name (you can modify this logic)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
  }
//const upload = multer({ storage: storage });
});
const upload = multer({ dest: 'uploads/', storage: storage})

// Create a recipe
router.post('/', async (req, res) => {
  const {
     name,
      icon,
       fav,
        userId
       } = req.body;
       console.log(name);
       console.log(icon);
       console.log(fav);
  Recipe.createRecipe(name, icon, fav, userId, (err, newRecipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(newRecipe);
  });
});

router.delete('/delete/:path', (req, res) => {
  const pathimage = req.params.path;
  console.log('path for delete '+pathimage);
  Recipe.deleteimage(pathimage,(err, validite) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(validite);
  });
})

router.post('/upload/:id', upload.single('image'),async  (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
  // Process the uploaded file
  const fileName = req.file.filename;
  const imageUrl = encodeURIComponent(fileName);
  console.log(id);

  Recipe.UpdateRecipeImage(id,imageUrl,(err, validite) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
  // If the user doesn't exist, add them to the database
    res.status(201).json(validite);
  });
});

// Get a recipe by ID
router.get('/:id', (req, res) => {
  const recipeId = req.params.id;
  Recipe.getFullRecipeById(recipeId, (err, recipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  });
});

// Get all recipes
router.get('/', (req, res) => {
  Recipe.getAllRecipes((err, recipes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(recipes);
  });
});

// get User by id recipe
router.get('/:id/user', (req, res) => {
  const recipeId = req.params.id;
  Recipe.getUserByRecipeId(recipeId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});

// get recipes by id User
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  Recipe.getRecipesByUserId(userId, (err, recipes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ error: 'Recipes not found for this user' });
    }
    res.json(recipes);
  });
});



router.get('/search/nom', (req, res) =>  {
  const searchTerm = req.query.key;
  console.log("key : " + searchTerm);
  Recipe.searchRecipes(searchTerm,(err, recipes)=> {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ error: 'Recipes not found !!!' });
    }
    res.json(recipes);
  });
});
// Add more routes for updating, deleting, or other operations as needed

module.exports = router;
