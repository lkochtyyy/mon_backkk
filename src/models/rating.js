const db = require('../config/db'); // ta config mysql (pool)

const Rating = {
  // Ajouter un avis
  async add(user_id, annonce_id, rating) {
    const sql = 'INSERT INTO ratings (user_id, annonce_id, rating) VALUES (?, ?, ?)';
    await db.execute(sql, [user_id, annonce_id, rating]);
  },

  // Récupérer tous les avis d'une annonce
  async getByAnnonce(annonce_id) {
    const sql = 'SELECT * FROM ratings WHERE annonce_id = ?';
    const [rows] = await db.execute(sql, [annonce_id]);
    return rows;
  },

  // Calculer la moyenne des notes d'une annonce
  async getAverageRating(annonce_id) {
    const sql = 'SELECT AVG(rating) as avgRating FROM ratings WHERE annonce_id = ?';
    const [rows] = await db.execute(sql, [annonce_id]);
    return rows[0].avgRating || 0;
  }
};

module.exports = Rating;
