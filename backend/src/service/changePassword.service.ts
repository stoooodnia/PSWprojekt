import { Request, Response } from "express";
import User, { UserInput } from "../models/user.model";

export async function changePassword(
  req: Request,
  email: string,
  newPassword: string
): Promise<UserInput | null> {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }

    user.password = newPassword;
    return user.save();
  } catch (error) {
    throw new Error(error as string);
  }
}
