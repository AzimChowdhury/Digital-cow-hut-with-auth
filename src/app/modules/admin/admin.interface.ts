import { Model } from "mongoose";

export type IAdmin = {
  _id?: string;
  phoneNumber: string;
  role: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};

// export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, "password" | "role" | "_id">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
