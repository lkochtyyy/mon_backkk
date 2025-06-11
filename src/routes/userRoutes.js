const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post("/register", userController.createUser);
router.post("/signIn", userController.signIn);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

router.put("/:id/nom", userController.updateNom);
router.put("/:id/prenom", userController.updatePrenom);
router.put("/:id/numTel", userController.updateNumTel);
router.put("/:id/password", userController.updatePassword);

module.exports = router;
