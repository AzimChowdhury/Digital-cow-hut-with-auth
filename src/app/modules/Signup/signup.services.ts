import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../users/user.interface";
import { Users } from "../users/user.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const signup = async (payload: IUser) => {
  if (payload.role === "seller") {
    payload.budget = 0;
    payload.income = 0;
  }
  if (payload.role === "buyer") {
    payload.income = 0;
    if (!payload.budget || payload.budget === 0) {
      throw new Error("Buyer must have budget");
    }
  }
  const result = await Users.create(payload);
  const { role, name, phoneNumber, address, income, budget } = result;
  return { role, name, phoneNumber, address, income, budget };
};

const loginUser = async (payload: {
  phoneNumber: string;
  password: string;
}) => {
  const { phoneNumber, password } = payload;
  const isUserExist = await Users.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  if (
    (await Users.isPasswordMatched(password, isUserExist.password)) === false
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const { _id, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { _id } = verifiedToken;

  const isUserExist = await Users.isUserExist(_id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not exist");
  }
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const signupService = {
  signup,
  loginUser,
  refreshToken,
};
