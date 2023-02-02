import { Request, Response } from "express";
import User, { UserInput } from "../models/user.model";

export async function getUserById(id: string): Promise<UserInput | null> {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    throw error;
  }
}
import mongoose from "mongoose";
