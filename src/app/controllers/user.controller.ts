import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import z, { success } from "zod";
import bcrypt from "bcryptjs";

export const userRoutes = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const body = await CreateUserZodSchema.parseAsync(req.body);
    const body = req.body;
    // const password = await bcrypt.hash(body.password, 10);
    // body.password = password;
    // const user = await User.create(body);
    // const user = new User(body);
    // const password = await user.hashPassword(body.password);
    // user.password = password;
    // await user.save();
    // const password = await User.hashPassword(body.password);
    // body.password = password;
    const user = await User.create(body);
    res.status(201).json({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    message: "Getting Users Successfully",
    users,
  });
});

userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.status(200).json({
    success: true,
    user,
  });
});

userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const updatedBody = req.body;
  const userId = req.params.userId;
  const user = await User.findByIdAndUpdate(userId, updatedBody, { new: true });
  res.status(201).json({
    success: true,
    message: "User Updated Successfully",
    user,
  });
});

userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);
  res.status(201).json({
    success: true,
    message: "User Deleted Successfully",
    user,
  });
});
