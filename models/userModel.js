const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'A user must have an email.'],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email address.']
  },
  photo: String,
  role: {
    type: String,
    enum: ['admin', 'guide', 'lead-guide', 'user'],
    default: 'user'
  },

  password: {
    type: String,
    required: [true, 'A password is required.'],
    minLength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      // Only works on CREATE and SAVE.
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords do not match.'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpiresIn: Date,
  active: { type: Boolean, default: true, select: false }
});

// encrypting plain passwords
userSchema.pre('save', async function(next) {
  // if passord is not changing why encrypt password again?
  if (!this.isModified('password')) return next();

  // hash the password
  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
  this.passwordConfirm = undefined; // no longer need it in DB
  next();
});

userSchema.pre('save', function(next) {
  // if password is not changed or a new doc then do nothing
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});
userSchema.methods.checkPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.checkIfPasswordRecentlyChanged = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimestamp > JWTTimestamp; // changed after JWT issue
  }
  return false;
};

userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000; // expires in 10 minutes
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
