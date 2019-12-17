const mongoose = require('mongoose');

// Create new Schema.
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Export it to be used in other files. To export: Put in variable
const User = mongoose.model('User', UserSchema);
module.exports = User;
