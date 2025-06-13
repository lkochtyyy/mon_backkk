const Rating = require('../models/rating');
const db = require('../config/db');

const RatingController = {
  async addRating(req, res) {
    console.log(req.body);
    try {
      const { user_id, annonce_id, rating } = req.body;

      // 1. Ajouter l'avis dans ratings
      await Rating.add(user_id, annonce_id, rating);

      // 2. Calculer la nouvelle moyenne
      const avgRating = await Rating.getAverageRating(annonce_id);

      // 3. Mettre à jour la colonne rating dans la table annonce
      await db.execute('UPDATE carannouncement SET rating = ? WHERE id = ?', [avgRating, annonce_id]);

      return res.json({ success: true, avgRating });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};

module.exports = RatingController;
