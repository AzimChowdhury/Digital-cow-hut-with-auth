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

export const UserServices = {
  getAllUsers,
};
