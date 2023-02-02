import { Request, Response } from "express";
import User, { UserInput } from "../models/user.model";

export async function getUserByEmail(email: string): Promise<UserInput | null> {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
}
