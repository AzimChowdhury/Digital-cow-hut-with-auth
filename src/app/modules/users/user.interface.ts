import { Model } from "mongoose";

export type IUser = {
  _id?: string;
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
};

// export type UserModel = Model<IUser, Record<string, unknown>>;

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, "password" | "role" | "_id">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
