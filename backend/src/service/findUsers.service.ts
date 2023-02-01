import express, { Request, Response } from "express";
import User, { UserInput } from "../models/user.model";

export async function getUsers(
  req: Request,
  email: string,
  newEmail: string
): Promise<Object | null> {
  try {
    const users = await User.find().limit(5);
    return users;
  } catch (error) {
    throw new Error(error as string);
  }
}
