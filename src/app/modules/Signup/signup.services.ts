import { IUser } from "../users/user.interface";
import { Users } from "../users/user.model";

const signup = async (payload: IUser) => {
  if (payload.role === "seller") {
    payload.budget = 0;
    if (!payload.income) {
      payload.income = 0;
    }
  }
  if (payload.role === "buyer") {
    payload.income = 0;
    if (!payload.budget || payload.budget === 0) {
      throw new Error("Buyer must have budget");
    }
  }
  const result = await Users.create(payload);
  return result;
};

export const signupService = {
  signup,
};
