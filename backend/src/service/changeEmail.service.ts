import express, { Request, Response } from "express";
import User, { UserInput } from "../models/user.model";

export async function changeEmail(
  id: string,
  newemail: string
): Promise<UserInput | null> {
  try {
    const user = await User.findOne({ _id: id });
    console.log(user);
    if (!user) {
      return null;
    }

    user.email = newemail;
    return user.save();
  } catch (error) {
    throw new Error(error as string);
  }
}
