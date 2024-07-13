import { Complaints } from "../models/complaints/complaints_model.js";

export const getComplaints = async (req, res) => {
  try {
    const data = await Complaints.find();
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

export const addComplaints = async (req, res) => {
  const { address, text } = req.body;
  try {
    const complaints = new Complaints({
      address,
      text,
    });
    const savedComplaints = await complaints.save();
    res.status(201).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    const complaint = await Complaints.findById(id);
    if (!complaint) return res.status(404).json("complaint not found");
    if (reply) complaint.reply = reply;
    const savedComplaints = await complaint.save();
    return res.status(200).json(savedComplaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaints.findByIdAndDelete(id);
    if (!complaint) return res.status(404).json("complaint not found");
    return res.status(200).json("Success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
