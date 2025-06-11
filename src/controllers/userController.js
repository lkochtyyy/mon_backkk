const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendMail } = require('../config/mailer');

const verificationCodes = new Map();

class UserController {
    async createUser(req, res) {
        try {
            const { nom, prenom, numTel, email, password, role } = req.body;
            const userExists = await User.findUserByEmail(email);
            if (userExists) return res.status(400).json({ message: "User already exists" });

            const newUser = await User.createUser({ nom, prenom, numTel, email, password, role });

            sendMail(email, "Welcome to Car Market 🚗", `<h1>Welcome, ${nom}!</h1><p>Enjoy browsing our car collection! 🚘</p>`);

            res.status(201).json({ 
                message: "User registered successfully!", 
                userId: newUser.id 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findUserByEmail(email);
            if (!user) return res.status(400).json({ message: "Invalid credentials" });

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign(
                { email: user.email, id: user.id },
                "default-secret",
                { expiresIn: "1h" }
            );

            res.json({ 
                token, 
                userId: user.id 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await User.findUserById(req.params.id);
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            await User.deleteUser(req.params.id);
            res.json({ message: "User deleted successfully!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateNom(req, res) {
        try {
            const { id } = req.params;
            const { newNom } = req.body;
            await User.updateNom(id, newNom);
            res.json({ message: "Nom updated successfully!", id: id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePrenom(req, res) {
        try {
            const { id } = req.params;
            const { newPrenom } = req.body;
            await User.updatePrenom(id, newPrenom);
            res.json({ message: "Prenom updated successfully!", id: id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateNumTel(req, res) {
        try {
            const { id } = req.params;
            const { newNumTel } = req.body;
            await User.updateNumTel(id, newNumTel);
            res.json({ message: "NumTel updated successfully!", id: id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePassword(req, res) {
        try {
            const { id } = req.params;
            const { newPassword } = req.body;
            await User.updatePassword(id, newPassword);
            res.json({ message: "Password updated successfully!", id: id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const user = await User.findUserByEmail(email);
            if (!user) return res.status(400).json({ message: "User not found" });

            const verificationCode = crypto.randomInt(100000, 999999);
            verificationCodes.set(email, verificationCode);
            sendMail(email, "Reset Your Password", `<h1>Reset Code: ${verificationCode}</h1>`);

            res.json({ message: "Reset code sent to your email " , verificationCode: verificationCode });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { email , receivedcode , verificationCode, newPassword } = req.body;
            if (receivedcode!== parseInt(verificationCode)) {
                return res.status(400).json({ message: "Invalid verification code" });
            }


            await User.updatePassword(email, newPassword);
            verificationCodes.delete(email);
            res.json({ message: "Password reset successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error resetting password", error: error.message });
        }
    }
}

module.exports = new UserController();
