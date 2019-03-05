const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CalcumonSchema = new Schema({
    name: { type: String , default: "monster1"},
    image: { type: String }
});

module.exports = mongoose.model("Calcumon", CalcumonSchema);
