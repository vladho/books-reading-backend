const bcrypt = require('bcryptjs');
const { Schema } = require('mongoose');

const SALT_FACTOR = 10;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      default: 'Guest',
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      validate(value) {
        const re = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 20,
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = bcrypt.genSalt(SALT_FACTOR);
  this.password = bcrypt.hash(this.password, salt, null);
  next();
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = userSchema;
