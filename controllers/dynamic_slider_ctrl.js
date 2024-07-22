import { dynamicSliderModel } from "../models/dunamic_sliders/dynamic_slider_model.js";

export const getAllSlidersImages = async (req, res) => {
  try {
    const sliders = await dynamicSliderModel.findOne();

    return res.status(200).json(sliders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addSliders = async (req, res) => {
  try {
    const userId = req.userId;
    const adminId = process.env.ADMIN_ID;
    if (userId !== adminId) {
      return res
        .status(403)
        .json("You don't have permission to make this action ");
    }
    const newSliders = new dynamicSliderModel({});
    if (req.files["mainSliderImg"]) {
      const mainSliderImg = req.files["mainSliderImg"];
      const imageUrls = [];
      if (!mainSliderImg || !Array.isArray(mainSliderImg)) {
        return res
          .status(404)
          .json({ message: "Attached files are missing or invalid." });
      }

      for (const image of mainSliderImg) {
        if (!image) {
          return res
            .status(404)
            .json({ message: "Attached file is not an image." });
        }

        const imageUrl = `${process.env.BASE_URL}/${image.path.replace(
          /\\/g,
          "/"
        )}`;
        imageUrls.push(imageUrl);
        newSliders.mainSlider = imageUrls;
      }
    }

    if (req.files["secondSliderImg"]) {
      const secondSliderImg = req.files["secondSliderImg"];
      const imageUrls = [];
      if (!secondSliderImg || !Array.isArray(secondSliderImg)) {
        return res
          .status(404)
          .json({ message: "Attached files are missing or invalid." });
      }

      for (const image of secondSliderImg) {
        if (!image) {
          return res
            .status(404)
            .json({ message: "Attached file is not an image." });
        }

        const imageUrl = `${process.env.BASE_URL}/${image.path.replace(
          /\\/g,
          "/"
        )}`;
        imageUrls.push(imageUrl);
        newSliders.secondSlider = imageUrls;
      }
    }
    const savedSlider = await newSliders.save();
    return res.status(201).json(savedSlider);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editSlider = async (req, res) => {
  try {
    const { sliderId } = req.params;
    const { removeMainSliderImages, removeSecondSliderImages } = req.body;
    const userId = req.userId;
    const adminId = process.env.ADMIN_ID;
    console.log(removeMainSliderImages);
    console.log(removeSecondSliderImages);
    if (userId !== adminId) {
      return res
        .status(403)
        .json("You don't have permission to make this action ");
    }
    const slider = await dynamicSliderModel.findById(sliderId);
    if (!slider) return res.status(404).json("Slider not found");

    if (removeMainSliderImages) {
      console.log("aaaaa");
      slider.mainSlider = slider.mainSlider.filter(
        image => !removeMainSliderImages.includes(image)
      );
    }
    if (removeSecondSliderImages) {
      console.log("bbbbb");
      slider.secondSlider = slider.secondSlider.filter(
        image => !removeSecondSliderImages.includes(image)
      );
    }

    if (req.files) {
      if (req.files["mainSliderImg"]) {
        const mainSliderImg = req.files["mainSliderImg"];
        const imageUrls = [];

        for (const image of mainSliderImg) {
          const imageUrl = `${process.env.BASE_URL}/${image.path.replace(
            /\\/g,
            "/"
          )}`;
          imageUrls.push(imageUrl);
        }

        slider.mainSlider = slider.mainSlider.concat(imageUrls);
      }
      if (req.files["secondSliderImg"]) {
        const secondSliderImg = req.files["secondSliderImg"];
        const imageUrls = [];

        for (const image of secondSliderImg) {
          const imageUrl = `${process.env.BASE_URL}/${image.path.replace(
            /\\/g,
            "/"
          )}`;
          imageUrls.push(imageUrl);
        }

        slider.secondSlider = slider.secondSlider.concat(imageUrls);
      }
    }
    const updatedSlider = await slider.save();

    return res.status(200).json(updatedSlider);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
