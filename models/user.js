const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Populate = require("../utils/autopopulate");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  password: { type: String, select: false },
  username: { type: String, required: true },
  email: { type: String, required: false},
  level: { type: Number, default: 1 },
  monster: { type: String },
  coins: { type: Number, default: 10 },
  items: [{ type: String }]
});

// Define the callback with a regular function to avoid problems with this
UserSchema.pre("save", function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified("password")) {
      return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
      });
  });
});

// Need to use function to enable this.password to work.
UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

// UserSchema.pre('findOne', Populate('calcumon')).pre('find', Populate('calcumon'))

module.exports = mongoose.model("User", UserSchema);
