import { feesModel } from "../models/fees/fees_model.js";

export const getFees = async (req, res) => {
  try {
    const fees = await feesModel.findOne();
    return res.status(200).json(fees);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const EditFees = async (req, res) => {
  try {
    const { feesFromSeller, feesFromBuyer, adsFees, dealsFees } = req.body;
    const data = await feesModel.findOne();
    if (feesFromSeller) data.feesFromSeller = feesFromSeller;
    if (feesFromBuyer) data.feesFromBuyer = feesFromBuyer;
    if (adsFees) data.adsFees = adsFees;
    if (dealsFees) data.dealsFees = dealsFees;
    await data.save();
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
