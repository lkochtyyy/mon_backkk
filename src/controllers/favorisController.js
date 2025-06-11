const Favoris = require('../models/favoris');

// ➕ Ajouter aux favoris
exports.addFavori = async (req, res) => {
  const { user_id, car_id } = req.body;
  //console.log("received body ", req.body);

  if (!user_id || !car_id) {
    //console.log("Validation failed: Missing user_id or car_id");
    return res.status(400).json({ error: 'user_id et car_id sont requis' });
  }

  try {
    const exists = await Favoris.checkExists(user_id, car_id);
    //console.log("Check exists result:", exists);

    if (exists) {
      return res.status(400).json({ error: 'Ce véhicule est déjà dans les favoris' });
    }

    const result = await Favoris.add(user_id, car_id);
    //console.log("Direct add result:", result);

    res.status(201).json({ message: 'Ajouté aux favoris ✅' });
  } catch (err) {
    //console.error("❌ Error in addFavori:", err);
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
};


// controller.js
exports.getFavorisByUser = async (req, res) => {
  console.log("user_id reçu:", req.params.user_id);

  const userId = req.params.user_id;

  if (!userId) {
    return res.status(400).json({ error: 'user_id est requis' });
  }

  try {
    const results = await Favoris.getByUser(userId);
    res.json({ success: true, favoris: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
  


exports.deleteFavori = async (req, res) => {
  const userId = req.params.user_id;
  const carId = req.params.car_id;

  if (!userId || !carId) {
    return res.status(400).json({ error: 'user_id et car_id sont requis' });
  }

  try {
    const result = await Favoris.delete(userId, carId);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Aucun favori trouvé à supprimer' });
    } else {
      res.status(200).json({ message: 'Favori supprimé avec succès ✅' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression du favori' });
  }
};

