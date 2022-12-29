const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    level: { type: String, required: true },
    profession: { type: String, required: true },
    password: { type: String, required: true },
    reportCount: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);


module.exports = userModel;
