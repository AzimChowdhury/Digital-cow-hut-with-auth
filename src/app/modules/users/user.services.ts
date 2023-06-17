import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { Users } from "./user.model";

const getAllUsers = async () => {
  const result = await Users.find();
  const total = await Users.countDocuments();
  return {
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    meta: {
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await Users.findOne({ _id: id });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await Users.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  // dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Users.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};

export const UserServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
};
