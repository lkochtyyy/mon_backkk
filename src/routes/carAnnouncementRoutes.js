const express = require('express');
const router = express.Router();
const controller = require('../controllers/carAnnouncementController');

router.post('/', controller.createAnnouncement);

router.get('/', controller.getAllAnnouncements);
router.get('/:id', controller.getAnnouncementById);
router.get('/vendor/:vendorId', controller.getAnnouncementsByVendor);
router.get('/search', controller.searchAnnouncements);

router.put('/:id', controller.updateAnnouncement);

router.delete('/:id', controller.deleteAnnouncement);

module.exports = router;
