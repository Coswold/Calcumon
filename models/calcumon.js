const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CalcumonSchema = new Schema({
    name: { type: String },
    level: { type: Number },
    image: { type: String },
    health: { type: Number }
});

module.exports = mongoose.model("Calcumon", UserSchema);
