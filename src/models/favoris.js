const db = require('../config/db');

const Favoris = {
  checkExists: async (user_id, car_id) => {
    const sql = 'SELECT COUNT(*) as count FROM favoris WHERE user_id = ? AND car_id = ?';
    //console.log("Avant requête SQL");

    const [rows] = await db.execute(sql, [user_id, car_id]);
    //console.log("Après requête SQL");

    return rows[0].count > 0;
  },

  add: async (user_id, car_id) => {
    const sql = 'INSERT INTO favoris (user_id, car_id) VALUES (?, ?)';
    const [result] = await db.execute(sql, [user_id, car_id]);
    return result;
  },

 // model.js
getByUser: async (user_id) => {
  const sql = 'SELECT * FROM favoris WHERE user_id = ?';
  const [rows] = await db.execute(sql, [user_id]);
  return rows;
},


  delete: async (user_id, car_id) => {
    const sql = 'DELETE FROM favoris WHERE user_id = ? AND car_id = ?';
    const [result] = await db.execute(sql, [user_id, car_id]);
    return result;
  }
};

module.exports = Favoris;
