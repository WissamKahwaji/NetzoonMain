import { LegalAdvice } from "../models/legal_advices/legalAdviceModel.js";

export const getLegalAdvices = async (req, res) => {
  try {
    const data = await LegalAdvice.find({});
    if (!data) {
      return res.status(404).json({ message: "no Data Found" });
    }
    return res.json({
      message: "success",
      results: data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editInfo = async (req, res) => {
  try {
    const { text, textEn, termofUse, termofUseEn } = req.body;
    const data = await LegalAdvice.findOne();
    if (text) data.text = text;
    if (textEn) data.textEn = textEn;
    if (termofUse) data.termofUse = termofUse;
    if (termofUseEn) data.termofUseEn = termofUseEn;

    await data.save();
    return res.status(200).json("success");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
