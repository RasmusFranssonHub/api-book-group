import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

// Get all users and get user by ID controllers

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get users" });
  }
};

// Get user by ID controller

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch {
    res.status(400).json({ message: "Invalid user id" });
  }
};

// Update user controller

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;

  const updates: { username?: string; password?: string } = {};

  if (typeof username === "string" && username.trim() !== "") {
    updates.username = username.trim();
  }

  if (typeof password === "string" && password !== "") {
    updates.password = await bcrypt.hash(password, 10);
  }

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ message: "Send username or password to update" });
    return;
  }

  try {
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User updated",
      user,
    });
  } catch {
    res.status(400).json({ message: "Could not update user" });
  }
};

// Delete user controller

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User deleted",
      id: user._id,
    });
  } catch {
    res.status(400).json({ message: "Invalid user id" });
  }
};

