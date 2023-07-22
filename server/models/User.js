const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt");
// const { v4: uuidv4 } = require('uuid');
// const shiftSchema = require('./Shift');
// const positionSchema = require('./Position');
// const companySchema = require('./Company');
const addressSchema = require("./Address");
// const accountSchema = require("./Account");

const userSchema = new Schema({
  // _id: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  firstName: {
    type: String,
    unique: false,
    required: true,
  },
  lastName: {
    type: String,
    unique: false,
    required: true,
  },
//   email: {
//     type: String,
//     unique: false,
//     match: [/.+@.+\..+/, "Must match an email address!"],
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
  phone: {
    type: String,
    unique: false,
    required: true,
  },
  socialSecurity: {
    type: String,
    unique: false,
    required: true,
  },
  hireDate: {
    type: String,
    unique: false,
    required: true,
  },
  terminationDate: {
    type: String,
    unique: false,
    required: false,
  },
  payRate: {
    type: Number,
    unique: false,
    required: true,
  },
  fullTime: {
    type: Boolean,
    unique: false,
    required: true,
  },
  activeEmployee: {
    type: Boolean,
    unique: false,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    unique: false,
    required: true,
  },
  shift: {
    type: Schema.Types.ObjectId,
    ref: "Shift",
  },
  position: {
    type: Schema.Types.ObjectId,
    ref: "Position",
  },
  address: [addressSchema],
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
});


// userSchema.pre('save', function (next) {
//   if (this.isNew) {
//     this._id = uuidv4(); // Set a unique ID for new users
//   }
//   next();
// });

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('socialSecurity')) {
        const saltRounds = 10;
        this.socialSecurity = await bcrypt.hash(this.socialSecurity, saltRounds);
    }
    next();
})
// custom method to compare and validate social security for database
userSchema.methods.isSocialSecurity = async function (socialSecurity) {
        return bcrypt.compare(socialSecurity, this.socialSecurity);
};

const User = model('User', userSchema);

module.exports = User
