import { Request, Response } from "express";
import User, { UserInput } from "../models/user.model";

export async function getUserByNickname(
  nickname: string
): Promise<UserInput | null> {
  try {
    const user = await User.findOne({ nickname });
    return user;
  } catch (error) {
    throw error;
  }
}
