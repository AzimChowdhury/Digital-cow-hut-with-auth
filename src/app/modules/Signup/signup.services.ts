import { IUser } from "../users/user.interface";
import { Users } from "../users/user.model";

const signup = async (payload: IUser) => {
  if (payload.role === "buyer" && (!payload.budget || payload.budget === 0)) {
    throw new Error("Buyer must have budget");
  } else if (
    payload.role === "seller" &&
    (!payload.income || payload.income === 0)
  ) {
    payload.income = 0;
  }
  const result = await Users.create(payload);
  return result;
};

export const signupService = {
  signup,
};
