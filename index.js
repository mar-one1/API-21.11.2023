const http = require('http');
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('DB_Notebook.db'); //database file name
const port = process.env.PORT || 3000;
const multer = require('multer');
const path = require('path');
app.use(express.static('public'));
const mongoose = require('mongoose');

const authRouter = require('./Api/Router/auth_Router');
// Import the verifyToken middleware
const verifyToken = require('./Api/Router/verifyToken'); // Adjust the path as needed
const bodyParser = require('body-parser');
const usersRouter = require('./Api/Router/usersRouter');
const recipeRouter = require('./Api/Router/recipeRouter');
const detailRecipeRouter = require('./Api/Router/detail_recipeRouter');
const ingredientRecipeRouter = require('./Api/Router/ingredient_recipeRouter');
const stepRecipeRouter = require('./Api/Router/step_recipeRouter');
const reviewRecipeRouter = require('./Api/Router/review_recipeRouter');
const produitRouter = require('./Api/Router/produit_Router');


// ...
// Middleware for parsing JSON request bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.use('/users', usersRouter);
app.use('/auth', authRouter);
// Apply the middleware to all routes
app.use(verifyToken);
app.use('/recipes', recipeRouter);
app.use('/detailrecipes', detailRecipeRouter);
app.use('/ingredientrecipes', ingredientRecipeRouter);
app.use('/steprecipes', stepRecipeRouter);
app.use('/reviewrecipes', reviewRecipeRouter);
app.use('/produits',produitRouter);


db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON'); // Enable foreign key support (optional)

  db.get("SELECT 1", (err, result) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
    } else {
      console.log('Connected to the database.');
      
      // You can perform your database operations here
    }
  });
});

// Connect to your MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/db_note', { useNewUrlParser: true, useUnifiedTopology: true });

  // Example: Protect a route using the verifyToken middleware
  app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This route is protected', user: req.user, token: req.newAccessToken});
  });


// Serving static files from the 'public' directory


 
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello Worl d');
// });


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
})



