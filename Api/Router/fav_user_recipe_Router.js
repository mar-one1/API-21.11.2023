const express = require('express');
const Favorite = require('../Model/Fav_user_recipe');

const router = express.Router();
router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));

// Route to create a new favorite
router.post('/', (req, res) => {
    console.log(req.body);
    const { FRK_user, FRK_recipe } = req.body;
    if (!FRK_user || !FRK_recipe) {
        return res.status(400).json({ error: 'Both userId and recipeId are required' });
    }
    console.log(FRK_user+" "+FRK_recipe);
    Favorite.create(FRK_user, FRK_recipe, (err, favorite) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create favorite' });
        }
        res.status(201).json(favorite);
    });
});

// Route to get all favorites
router.get('/', (req, res) => {
    Favorite.getAll((err, favorites) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch favorites' });
        }
        res.json(favorites);
    });
});

// Route to delete a favorite by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Favorite.deleteFavorite(favoriteId, (err, deleted) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete favorite' });
        }
        if (!deleted) {
            return res.status(404).json({ error: 'Favorite not found or not deleted' });
        }
        res.json({ message: 'Favorite deleted successfully' });
    });
});

// Route to update favorite by ID
router.put('/:id', (req, res) => {
    const favoriteId = req.params.favoriteId;
    const { userId, recipeId } = req.body;

    // Call the updateFavorite method from the Favorite model
    Favorite.updateFavorite(
        favoriteId,
        userId,
        recipeId,
        (err, updatedFavorite) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update favorite' });
            }
            if (!updatedFavorite) {
                return res.status(404).json({ error: 'Favorite not found or not updated' });
            }
            res.json(updatedFavorite);
        }
    );
});

// Route to get favorites by user ID
router.get('/:id', (req, res) => {
    const FRK_user = req.params.id;
    console.log(FRK_user);

    // Call the method to get favorites by user ID from the Favorite model
    Favorite.getFavoritesByUserId(FRK_user, (err, favorites) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch favorites' });
        }
        if (!favorites) {
            return res.status(404).json({ error: 'Favorite not found ' });
        }
        res.json(favorites);
    });
});


module.exports = router;
