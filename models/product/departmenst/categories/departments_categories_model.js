import mongoose from "mongoose";

const DepartmentsCategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  nameAr: String,
  imageUrl: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Departments" },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  ],
});

export const DepartmentsCategory = mongoose.model(
  "DepartmentsCategory",
  DepartmentsCategorySchema
);
