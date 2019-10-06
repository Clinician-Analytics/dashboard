const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    employers: [
        {
            title: {
                type: String,
                required: true
            },
            certification: {
                type: String,
                required: true
            }
        }
    ]
});


module.exports = Profile = mongoose.model('profile', ProfileSchema);