const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async createUser({ nom, prenom, numTel, email, password, role }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            "INSERT INTO utilisateur (nom, prenom, tel, email, password, role) VALUES (?, ?, ?, ?, ?, ?)",
            [nom, prenom, numTel, email, hashedPassword, role]
        );
        return { id: result.insertId };
    }

    static async findUserByEmail(email) {
        const [user] = await db.execute("SELECT * FROM utilisateur WHERE email = ?", [email]);
        return user[0];
    }

    static async findUserById(id) {
        const [user] = await db.execute("SELECT * FROM utilisateur WHERE id = ?", [id]);
        return user[0];
    }

    static async deleteUser(id) {
        return await db.execute("DELETE FROM utilisateur WHERE id = ?", [id]);
    }

    static async updateNom(id, newNom) {
        return await db.execute("UPDATE utilisateur SET nom = ? WHERE id = ?", [newNom, id]);
    }

    static async updatePrenom(id, newPrenom) {
        return await db.execute("UPDATE utilisateur SET prenom = ? WHERE id = ?", [newPrenom, id]);
    }

    static async updateNumTel(id, newNumTel) {
        return await db.execute("UPDATE utilisateur SET tel = ? WHERE id = ?", [newNumTel, id]);
    }

    static async updatePassword(id , newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return await db.execute("UPDATE utilisateur SET password = ? WHERE id = ?", [hashedPassword, id]);
    }
}

module.exports = User;
