const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: { type: String, required: true },
    // topic: { type: String, required: true },
    players: [{ type: String, default: [] }]
})

module.exports = mongoose.model("Room", RoomSchema)