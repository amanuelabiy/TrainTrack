import { RequestHandler } from "express";
import { Types } from "mongoose";
import UserModel from "../models/User";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getAuthenticatedUser = async (
  authenticatedUserId: Types.ObjectId | undefined
) => {
  if (!authenticatedUserId) {
    throw createHttpError(401, "User not authenticated");
  }
  const user = await UserModel.findById(authenticatedUserId)
    .select("+email")
    .exec();

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  return user;
};

interface SignUpBodyInfo {
  username?: string;
  email?: string;
  passwordRaw?: string;
}

export const signUp = async (signUpInfo: SignUpBodyInfo) => {
  const { username, email, passwordRaw } = signUpInfo;

  if (!username || !email || !passwordRaw) {
    throw createHttpError(400, "Parameters missing");
  }

  const existingUsername = await UserModel.findOne({
    username: username,
  }).exec();

  if (existingUsername) {
    throw createHttpError(409, "Username already taken.");
  }

  const existingEmail = await UserModel.findOne({ email: email }).exec();

  if (existingEmail) {
    throw createHttpError(
      409,
      "A user with this email address already exists. Please log in instead. "
    );
  }

  const passwordHashed = await bcrypt.hash(passwordRaw, 10);

  const newUser = await UserModel.create({
    username: username,
    email: email,
    password: passwordHashed,
  });

  return newUser;
};
