import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  mainSlider: {
    type: [String],
    default: [],
  },
  secondSlider: {
    type: [String],
    default: [],
  },
});

export const dynamicSliderModel = mongoose.model("dynamicSlider", sliderSchema);
