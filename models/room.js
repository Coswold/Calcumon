const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: { type: String, required: true },
    // topic: { type: String, required: true },
    players: [{ type: String, default: [] }],
    lastping: { type: Date },
}, {timestamps: true} )

RoomSchema.index({lastping: 1}, {expireAfterSeconds: 60})

module.exports = mongoose.model("Room", RoomSchema)
