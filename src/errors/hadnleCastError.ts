import mongoose from "mongoose";
import IGenericErrorMessage from "../interface/error";

export const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    { path: error.path, message: "Invalid Id" },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "CastError",
    errorMessages: errors,
  };
};
