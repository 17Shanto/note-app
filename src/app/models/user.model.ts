import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserStaticMethods,
} from "../interfaces/user.interfaces";
import validator from "validator";
import { UserInstanceMethods } from "./../interfaces/user.interfaces";
import bcrypt from "bcryptjs";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String, required: true },
    street: { type: String, required: true },
    zip: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>(
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
      type: addressSchema,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.post("save", function (doc) {
  console.log("%s Inside post save hook", doc._id);
});

export const User = model<IUser, UserStaticMethods>("User", userSchema);
