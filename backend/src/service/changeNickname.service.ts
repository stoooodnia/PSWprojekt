import express, { Request, Response } from "express";
import User, { UserInput } from "../models/user.model";

export async function changeNickname(
  id: string,
  newNickname: string
): Promise<UserInput | null> {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return null;
    }

    user.nickname = newNickname;
    return user.save();
  } catch (error) {
    throw new Error(error as string);
  }
}
