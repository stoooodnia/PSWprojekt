import mongoose from "mongoose";
// import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  email: string;
  nickname: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = function (
  candidatePassword: string
): boolean {
  const user = this as UserDocument;
  return candidatePassword === user.password;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
