import express, { Request, Response } from "express";
import User, { UserInput } from "../models/user.model";

export async function findUsersRegex(pattern: string): Promise<Object | null> {
  try {
    const users = await User.find({
      nickname: { $regex: pattern, $options: "i" },
    }).limit(5);
    return users;
  } catch (error) {
    throw new Error(error as string);
  }
}
