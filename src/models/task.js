const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    description: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = model('Task', taskSchema);