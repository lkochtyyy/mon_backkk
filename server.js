require('dotenv').config(); 
const express = require('express');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');

const userRoutes = require('./src/routes/userRoutes');
const carAnnouncementRoutes = require('./src/routes/carAnnouncementRoutes');
const favorisRoutes = require('./src/routes/favorisRoutes'); // 💡 ajout favoris


const app = express();
app.use(fileUpload());

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// 📦 ROUTES
app.use("/user", userRoutes);
app.use("/carAnnouncement", carAnnouncementRoutes);
app.use("/favoris", favorisRoutes); 
// 📤 Upload d’image de voiture
app.post('/uploadCarImage', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let uploadedFile = req.files.file;
  const uploadPath = path.join(__dirname, 'carImage', uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ fileName: uploadedFile.name });
  });
});

// 🖼️ Récupération d'images
app.use('/fetchCarImages', express.static(path.join(__dirname, 'carImage')));

// 🚀 Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
