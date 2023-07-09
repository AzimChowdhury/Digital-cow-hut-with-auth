import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";

const createAdmin = async (payload: IAdmin) => {
  if (payload.role !== "admin") {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Role is not acceptable");
  }

  const result = await Admin.create(payload);
  const { phoneNumber, role, name, address, _id } = result;
  return { phoneNumber, role, name, address, _id };
};

const loginAdmin = async (payload: {
  phoneNumber: string;
  password: string;
}) => {
  const { phoneNumber, password } = payload;
  const isAdminExist = await Admin.isAdminExist(phoneNumber);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not exist");
  }
  if (
    (await Admin.isPasswordMatched(password, isAdminExist.password)) === false
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const { _id, role } = isAdminExist;

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

  const isAdminExist = await Admin.isAdminExist(_id);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not exist");
  }
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isAdminExist._id,
      role: isAdminExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const myProfile = async (id: string) => {
  const result = await Admin.findOne({ _id: id });
  if (result) {
    const { name, phoneNumber, role, _id, address } = result;
    return { name, phoneNumber, role, _id, address };
  } else {
    throw new Error();
  }
};

const updateMyProfile = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "profile not found !");
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IAdmin> = { ...userData };

  // dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};

export const AdminServices = {
  createAdmin,
  loginAdmin,
  refreshToken,
  myProfile,
  updateMyProfile,
};
