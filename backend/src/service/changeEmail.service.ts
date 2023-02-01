import express, { Request, Response } from "express";
import User, { UserInput } from "../models/user.model";

export async function changeEmail(
  req: Request,
  email: string,
  newEmail: string
): Promise<UserInput | null> {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }

    user.email = newEmail;
    return user.save();
  } catch (error) {
    throw new Error(error as string);
  }
}
