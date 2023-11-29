const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
//const upload = multer({ dest: 'uploads/'});
// Use multer as middleware to handle multipart/form-data requests
//router.use(upload.any());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
//router.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: './public/uploads/', // Destination directory
  filename: function (req, file, cb) {
      // Define a custom file name (you can modify this logic)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
  }
//const upload = multer({ storage: storage });
});

const upload = multer({ dest: 'uploads/', storage: storage})


// Create a new user
router.post('/', async (req, res) => {
  const {
    username,
    firstname,
    lastname,
    birthday,
    email,
    phoneNumber,
    icon,
    password,
    grade,
    status,
  } = req.body;
  User.createUser(
    username,
    firstname,
    lastname,
    birthday,
    email,
    phoneNumber,
    icon,
    password,
    grade,
    status,
    (err, newUser) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      

    // If the user doesn't exist, add them to the database

      res.status(201).json(newUser);
    }
  );
});

router.post('/upload/:username', upload.single('image'), (req, res) => {
  
  const username = req.params.username;
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
  // Process the uploaded file
  const fileName = req.file.filename;
  const imageUrl = encodeURIComponent(fileName);
  User.UpdateUserImage(username,imageUrl,(err, validite) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
  // If the user doesn't exist, add them to the database
    res.status(201).json(validite);
  }
);
  //res.status(200).json(req.file.path);
  //res.send('File uploaded successfully.');
});

router.put('/image/:username', upload.single('avatar'), async (req, res) => {
  console.log(req.file,req.file.path)
  const username = req.params.username;
  const receivedByteArray = req.body;
  User.UpdateUserImage(username,receivedByteArray,(err, validite) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
    // If the user doesn't exist, add them to the database
      res.status(201).json(validite);
    }
  );
});

// Get a user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  User.getUserById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});

// Get a user by USERNAME
router.get('/filtre/:username', (req, res) => {
  const username = req.params.username;
console.log(username)
  User.getUserByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } 
    res.json(user);
  });
});

// Get a user by image user
router.get('/image/:username', (req, res) => {
  const username = req.params.username;
console.log("username for image is : " +username)
  User.getUserImage(username, (err, imageByte) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!imageByte) {
      return res.status(404).json({ error: 'image not found' });
    } 
    console.log(imageByte);
    res.json(imageByte);
  });
});

// get All Users
router.get('/', (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(users);
  });
});

// Add more user routes as needed

// Update a user by ID
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const {
    username,
    firstname,
    lastname,
    birthday,
    email,
    phoneNumber,
    icon,
    password,
    grade,
    status,
  } = req.body;
  User.updateUser(userId,username,firstname,lastname,birthday,email,phoneNumber,icon,password,grade,status, (err, updatedUser) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found or not updated' });
    }
    res.json(updatedUser);
  });
});

// Update a user by USERNAME
router.put('/filtre/:username', (req, res) => {
  const username = req.params.username;
  console.log(username);
  const {
    firstname,
    lastname,
    birthday,
    email,
    phoneNumber,
    icon,
    password,
    grade,
    status,
  } = req.body;
  User.updateUserByUsername(username,firstname,lastname,birthday,email,phoneNumber,icon,password,grade,status, (err, updatedUser) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found or not updated' });
    }
    res.json(updatedUser);
  });
});





// Delete a user by ID
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  User.deleteUser(userId, (err, deleted) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!deleted) {
      return res.status(404).json({ error: 'User not found or not deleted' });
    }
    res.json({ message: 'User deleted successfully' });
  });
  // Implement delete logic here using the User model
});

// Add more user routes with parameters as needed

// Define a route for the root URL
router.get('/', (req, res) => {
  res.send('Hello from the router User!');
});


module.exports = router;

