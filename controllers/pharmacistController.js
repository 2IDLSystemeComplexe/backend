const Pharmacist = require('../models/Pharmacist');
const bcrypt = require('bcryptjs');

// Create a new pharmacist (admin only)
exports.createPharmacist = async (req, res) => {
  try {
    const { username, email, password, phone, pharmacyName, localisation } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const pharmacist = new Pharmacist({
      username,
      email,
      password: hashedPassword,
      role: 'pharmacist',
      phone,
      pharmacyName,
      localisation
    });

    await pharmacist.save();
    res.status(201).json({ message: 'Pharmacist created successfully', pharmacist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all pharmacists
exports.getAllPharmacists = async (req, res) => {
  try {
    const pharmacists = await Pharmacist.find();
    res.json(pharmacists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a pharmacist by ID
exports.getPharmacistById = async (req, res) => {
  try {
    const pharmacist = await Pharmacist.findById(req.params.id);
    if (!pharmacist) return res.status(404).json({ message: 'Pharmacist not found' });
    res.json(pharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a pharmacist
exports.updatePharmacist = async (req, res) => {
  try {
    const { password, ...updateFields } = req.body;

    // If password is provided, hash it
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const updatedPharmacist = await Pharmacist.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedPharmacist) return res.status(404).json({ message: 'Pharmacist not found' });

    res.json({ message: 'Pharmacist updated', updatedPharmacist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a pharmacist
exports.deletePharmacist = async (req, res) => {
  try {
    const deleted = await Pharmacist.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Pharmacist not found' });

    res.json({ message: 'Pharmacist deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
