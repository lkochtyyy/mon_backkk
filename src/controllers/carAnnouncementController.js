const CarAnnouncement = require('../models/CarAnnouncement');

exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = await CarAnnouncement.create(req.body);
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await CarAnnouncement.getAll();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await CarAnnouncement.getById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnnouncementsByVendor = async (req, res) => {
  try {
    const announcements = await CarAnnouncement.getByVendor(req.params.vendorId);
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchAnnouncements = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await CarAnnouncement.search(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const updated = await CarAnnouncement.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await CarAnnouncement.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
