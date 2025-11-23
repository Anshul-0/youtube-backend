import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // Cloudnary operator
      required: true,
    },
    coverImage: {
      type: String, //Cloudnary operator
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // first method
  /*
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    next();
    }
    */

  // second method

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Custom method to verify password

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Token Generation methods

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SCERET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { 
        _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}; 

export const User = mongoose.model("User", userSchema);
