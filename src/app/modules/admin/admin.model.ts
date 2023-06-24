import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

adminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmin, "password" | "role" | "_id"> | null> {
  return await Admin.findOne({ phoneNumber }, { _id: 1, password: 1, role: 1 });
};

adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
  // return givenPassword === savedPassword;
};

adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
export const Admin = model<IAdmin, AdminModel>("admin", adminSchema);
