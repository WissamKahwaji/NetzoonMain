import mongoose from "mongoose";

const serviceCategorySchema = new mongoose.Schema({
  title: String,
  titleAr: String,
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyServices",
      default: [],
    },
  ],
});

export const serviceCategoryModel = mongoose.model(
  "serviceCategory",
  serviceCategorySchema
);
