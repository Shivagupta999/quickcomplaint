const express = require('express');
const { body, validationResult } = require('express-validator');
const Complaint = require('../Models/Complaint');
const { auth, adminOnly } = require('../Middlewares/authMiddleware');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    let complaints;

    if (req.user.role === 'admin') {
      complaints = await Complaint.find().populate('userId', 'name rollNumber email');
    } else {
      complaints = await Complaint.find({ userId: req.user.id }).populate('userId', 'name rollNumber email');
    }

    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post(
  '/',
  auth,
  [ body('roomNumber').notEmpty(),
    body('text').notEmpty()],
  async (req, res) => {
    // console.log("Incoming body:", req.body);
    // console.log("User:", req.user);

    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can create complaints' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const complaint = await Complaint.create({
        text: req.body.text,
        userId: req.user.id,
        roomNumber: req.body.roomNumber,
      });
      res.status(201).json(complaint);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    complaint.resolved = req.body.resolved ?? complaint.resolved;
    await complaint.save();

    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
