const mongoose = require('mongoose');

    const employeeSchema = new mongoose.Schema({
        first_name: { type: String, required: true, trim: true, lowercase: true },
        last_name: { type: String, required: true, trim: true, lowercase: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        gender: { type: String, trim: true, lowercase: true },
        salary: { type: Number, required: true },
    });

    module.exports = mongoose.model('Employee', employeeSchema);