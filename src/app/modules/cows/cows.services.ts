import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICow, ICowFilters } from "./cows.interface";
import { Cows } from "./cows.model";
import { Users } from "../users/user.model";
import { IPaginationOptions } from "../../../shared/pagination";
import { paginationHelpers } from "../../../shared/paginationHelpers";
import { cowSearchableFields } from "./cows.constants";
import { SortOrder } from "mongoose";

const createCow = async (payload: ICow) => {
  const isExist = await Users.findById(payload.seller);
  if (isExist && isExist.role === "seller") {
    const result = (await Cows.create(payload)).populate("seller");

    return result;
  } else {
    throw new Error("sellerId did not matched with any seller");
  }
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions,
  minPrice: any,
  maxPrice: any
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (minPrice) {
    andConditions.push({
      price: {
        $gte: Number(minPrice),
      },
    });
  }
  if (maxPrice) {
    andConditions.push({
      price: {
        $lte: Number(maxPrice),
      },
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cows.find(whereConditions)
    .populate("seller")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total =
    andConditions.length > 0 ? result.length : await Cows.countDocuments();
  return {
    success: true,
    statusCode: 200,
    message: "Cows retrieved successfully",
    meta: {
      page,
      limit,
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
