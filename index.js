const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const socketIo = require('socket.io');
const db = new sqlite3.Database('DB_Notebook.db'); //database file name
const port = process.env.PORT || 3000;
app.use(express.static('public'));
const swaggerSetup = require('./Api/swagger');


const { deleteUnusedImages } = require('./Api/Router/ImageHelper');
const authRouter = require('./Api/Router/auth_Router');
// Import the verifyToken middleware
const verifyToken = require('./Api/Middleware/verifyToken'); // Adjust the path as needed
const bodyParser = require('body-parser');
const usersRouter = require('./Api/Router/usersRouter');
const recipeRouter = require('./Api/Router/recipeRouter');
const detailRecipeRouter = require('./Api/Router/detail_recipeRouter');
const ingredientRecipeRouter = require('./Api/Router/ingredient_Router');
const stepRecipeRouter = require('./Api/Router/step_recipeRouter');
const reviewRecipeRouter = require('./Api/Router/review_recipeRouter');
const produitRouter = require('./Api/Router/produit_Router');
const favRouter = require('./Api/Router/fav_user_recipe_Router');
const recipeModelRouter = require('./Api/Repo/recipeModelRouter');
const categoryModelRouter = require('./Api/Router/category_Router');
const chatRoutes = require('./Api/Router/chat_Router');

const server = http.createServer(app);
const io = socketIo(server);

app.delete('/cleanup-images', async (req, res) => {
  try {
      const result = await deleteUnusedImages();
      res.status(200).json(result);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


// ...
// Middleware for parsing JSON request bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Initialize Swagger documentation
swaggerSetup(app);


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
app.use('/favorites',favRouter);
app.use('/api', recipeModelRouter);
app.use('/category', categoryModelRouter);
app.use('/api/chat', chatRoutes);

// Serve Swagger UI

// Handle connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    // Load existing messages
    messageModel.getAllMessages((err, messages) => {
        if (err) {
            console.error('Error fetching messages', err);
        } else {
            socket.emit('load messages', messages);
        }
    });

    // Handle chat message event
    socket.on('chat message', (msg) => {
        // Save message to database
        messageModel.saveMessage(msg, (err, message) => {
            if (err) {
                console.error('Error saving message', err);
            } else {
                // Broadcast the message to all connected clients
                io.emit('chat message', message);
            }
        });
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});



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
//mongoose.connect('mongodb://127.0.0.1:27017/db_note', { useNewUrlParser: true, useUnifiedTopology: true });

  // Example: Protect a route using the verifyToken middleware
  app.get('/protected', verifyToken, (req, res) => {
    // Check if token was refreshed
  if (req.tokenRefreshed) {
    // If token was refreshed, respond with the new token
    res.status(201).json({ message: 'This route is protected token was refreshed', user: req.user, token: req.newAccessToken});
  } else {
    // If token was valid, proceed with the endpoint logic
    // Your endpoint logic here...
    res.status(200).json({ message: 'This route is protected', user: req.user, token: req.newAccessToken});
  }
    
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



