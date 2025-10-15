const express = require('express');
const router = express.Router();
const { Client } = require('../models');
const authenticate = require('../middleware/authMiddleware');

// Get all clients of logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const clients = await Client.findAll({ where: { userId: req.userId } });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create a client
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const client = await Client.create({
      name,
      email,
      phone,
      address,
      userId: req.userId
    });
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create client' });
  }
});

// Update client
router.put('/:id', authenticate, async (req, res) => {
  try {
    const client = await Client.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!client) return res.status(404).json({ msg: 'Client not found' });

    const { name, email, phone, address } = req.body;
    await client.update({ name, email, phone, address });
    res.json(client);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update client' });
  }
});

// Delete client
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const client = await Client.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!client) return res.status(404).json({ msg: 'Client not found' });

    await client.destroy();
    res.json({ msg: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete client' });
  }
});

module.exports = router;
