import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICow } from "./cows.interface";
import { Cows } from "./cows.model";
import { Users } from "../users/user.model";

const createCow = async (payload: ICow) => {
  const isExist = await Users.findById(payload.seller);
  if (isExist && isExist.role === "seller") {
    const result = (await Cows.create(payload)).populate("seller");

    return result;
  } else {
    throw new Error("sellerId did not matched with any seller");
  }
};

const getAllCows = async () => {
  const result = await Cows.find().populate("seller");
  const total = await Cows.countDocuments();
  return {
    success: true,
    statusCode: 200,
    message: "Cows retrieved successfully",
    meta: {
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cows.findOne({ _id: id }).populate("seller");
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExist = await Cows.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found !");
  }

  const { ...cowData } = payload;

  const updatedCowData: Partial<ICow> = { ...cowData };

  const result = await Cows.findOneAndUpdate({ _id: id }, updatedCowData, {
    new: true,
  });
  return result;
};

const deleteCow = async (id: string) => {
  const result = await Cows.findByIdAndDelete({ _id: id });

  return result;
};

export const CowServices = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
