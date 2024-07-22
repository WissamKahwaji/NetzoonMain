import mongoose from "mongoose";

const feesSchema = new mongoose.Schema({
  feesFromSeller: Number,
  feesFromBuyer: Number,
  adsFees: Number,
  dealsFees: Number,
});

export const feesModel = mongoose.model("Fees", feesSchema);
