import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interfaces";
import validator from "validator";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be upper or equals to 18 {VALUE}"],
      max: 60,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      // validate: {
      //   validator: function (value) {
      //     return /^[^\s@]+@[^\s@]+\.[^s@]+$/.test(value);
      //   },
      //   message: function (props) {
      //     return `Email ${props.value} is not valid`;
      //   },
      // },
      validate: [validator.isEmail, "Invalid Email {VALUE}"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role is not valid. Got {VALUE} role",
      },
      default: "user",
    },
    address: {
      city: { type: String },
      street: { type: String },
      zip: { type: Number },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("User", userSchema);
