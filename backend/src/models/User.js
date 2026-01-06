const {Schema,model} = require("mongoose")
const bcrypt = require("bcryptjs");

//User schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, 
    },
  },
  {
    timestamps: true, 
  }
);


//Model --> connects schema to collection
const User = new model("User", UserSchema);

module.exports = User;
