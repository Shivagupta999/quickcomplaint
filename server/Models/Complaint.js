const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    text: { type: String, required: true },
    roomNumber: { type: String, required: true },
    resolved: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
