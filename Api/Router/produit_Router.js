<<<<<<< Updated upstream
const express = require('express');
const router = express.Router();
const Produit = require('../Model/Produit');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// Create a new "Produit"
router.post('/', async (req, res) => {
  const { name, weight } = req.body;
  Produit.createProduit(name, weight, (err, newProduit) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(newProduit);
  });
});

// Get a "Produit" by ID
router.get('/:id', (req, res) => {
  const produitId = req.params.id;
  Produit.getProduitById(produitId, (err, produit) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!produit) {
      return res.status(406).json({ error: 'Produit not found' });
    }
    res.json(produit);
  });
});

// Get All "Produits"
router.get('/', (req, res) => {
  Produit.getAllProduits((err, produits) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(produits);
  });
});

// Update a "Produit" by ID
router.put('/:id', (req, res) => {
  const produitId = req.params.id;
  const { name, weight } = req.body;
  Produit.updateProduit(produitId, name, weight, (err, updatedProduit) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!updatedProduit) {
      return res.status(406).json({ error: 'Produit not found or not updated' });
    }
    res.json(updatedProduit);
  });
});

// Delete a "Produit" by ID
router.delete('/:id', (req, res) => {
  const produitId = req.params.id;
  Produit.deleteProduit(produitId, (err, deleted) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!deleted) {
      return res.status(406).json({ error: 'Produit not found or not deleted' });
    }
    res.json({ message: 'Produit deleted successfully' });
  });
});

// Define a route for the root URL
router.get('/', (req, res) => {
  res.send('Hello from the router Produit!');
});

=======
const express = require('express');
const router = express.Router();
const Produit = require('../Model/Produit');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// Create a new "Produit"
router.post('/', async (req, res) => {
  const { name, weight } = req.body;
  Produit.createProduit(name, weight, (err, newProduit) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(newProduit);
  });
});

// Get a "Produit" by ID
router.get('/:id', (req, res) => {
  const produitId = req.params.id;
  Produit.getProduitById(produitId, (err, produit) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!produit) {
      return res.status(404).json({ error: 'Produit not found' });
    }
    res.json(produit);
  });
});

// Get All "Produits"
router.get('/', (req, res) => {
  Produit.getAllProduits((err, produits) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(produits);
  });
});

// Update a "Produit" by ID
router.put('/:id', (req, res) => {
  const produitId = req.params.id;
  const { name, weight } = req.body;
  Produit.updateProduit(produitId, name, weight, (err, updatedProduit) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!updatedProduit) {
      return res.status(404).json({ error: 'Produit not found or not updated' });
    }
    res.json(updatedProduit);
  });
});

// Delete a "Produit" by ID
router.delete('/:id', (req, res) => {
  const produitId = req.params.id;
  Produit.deleteProduit(produitId, (err, deleted) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!deleted) {
      return res.status(404).json({ error: 'Produit not found or not deleted' });
    }
    res.json({ message: 'Produit deleted successfully' });
  });
});

// Define a route for the root URL
router.get('/', (req, res) => {
  res.send('Hello from the router Produit!');
});

>>>>>>> Stashed changes
module.exports = router;