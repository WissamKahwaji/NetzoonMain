const adminCheck = (req, res, next) => {
  const userId = req.userId;
  const adminId = process.env.ADMIN_ID;
  if (userId !== adminId) {
    return res
      .status(403)
      .json("You don't have permission to make this action");
  }
  next();
};

export default adminCheck;
