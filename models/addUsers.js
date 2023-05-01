import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: [true, "Please add a name"],
    },
    password: {
      type: String,
      // required: true,
      // validate: {
      //   validator: function (value) {
      //     return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/gm.test(value);
      //   },
      //   message:
      //     "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
      // },
    },
    cash: {
      type: Number,
    },
    credit: {
      type: Number,
    },
    // userInformation: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Cash",
    //   },
    // ],
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
console.log("process.env.JWT_EXPIRE", process.env.JWT_EXPIRE);
userSchema.methods.generateAuthToken = function () {
  // const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRE,
  // });
  const token = jwt.sign(
    { id: this._id, cash: this.cash, credit: this.credit },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
  
  return token;
};
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
  

  
});

export default mongoose.model("User", userSchema);
