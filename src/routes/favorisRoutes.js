const express = require('express');
const router = express.Router();
const favorisController = require('../controllers/favorisController');

// ➕ Ajouter aux favoris
router.post('/', favorisController.addFavori);

// 📥 Obtenir les favoris d’un utilisateur
router.get('/:user_id', favorisController.getFavorisByUser);

// ❌ Supprimer un favori
router.delete('/:user_id/:car_id', favorisController.deleteFavori);

module.exports = router;
