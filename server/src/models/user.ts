import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
}

export type User = IUser & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
